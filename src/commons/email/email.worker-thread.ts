import { parentPort, workerData } from 'worker_threads';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './enums/teamplate.enums';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import * as hbs from 'nodemailer-express-handlebars';

async function sendEmail({
  to,
  subject,
  text,
  template,
  context,
}: {
  to: string;
  subject: string;
  text: string;
  template?: EmailTemplate;
  context?: any;
}) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // 또는 사용하고자 하는 이메일 서비스
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  transporter.use(
    'complie',
    hbs({
      viewEngine: {
        extname: '.hbs', // 파일 확장자
        partialsDir: `${process.cwd()}/templates`, // 템플릿 파일이 위치한 폴더
        defaultLayout: false, // 기본 레이아웃 사용 안 함
      },
      viewPath: `${process.cwd()}/templates`, // 템플릿 파일 경로
      extName: '.hbs',
    }),
  );
  const html = readFileSync(`${process.cwd()}/templates/${template.path}`, 'utf8');
  // Handlebars 템플릿 엔진 설정
  console.log('templateArgs: ', context);
  const mailOptions = { to: 'cafejun17@gmail.com', from: 'tb25271@gmail.com', subject, text, html: getTemplate(template, context), context };

  return await transporter.sendMail(mailOptions);
}

function getTemplate(emailTemplate: EmailTemplate, context: any) {
  const teamplatePath = join(process.env.PWD, `/templates/${emailTemplate.path}`);
  const emailTemplateSource = readFileSync(teamplatePath, 'utf8');
  const template = compile(emailTemplateSource);
  const htmlSendMessage = template({ ...context });
  return htmlSendMessage;
}

// 워커 쓰레드가 시작되면 이메일을 보냅니다.
(async () => {
  try {
    const { to, subject, text, template, context } = workerData;
    const result = await sendEmail({ to, subject, text, template, context });
    parentPort.postMessage(result); // 메인 스레드로 결과 전송
  } catch (error) {
    console.log('error ', error);
    parentPort.postMessage({ error: error.message });
  }
})();
