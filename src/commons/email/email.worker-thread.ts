import { parentPort, workerData } from 'worker_threads';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './enums/teamplate.enums';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';

async function sendEmail(payload: { to: string; subject: string; text: string; template?: EmailTemplate; templateArgs?: any }) {
  const { to, subject, text, template, templateArgs } = payload;
  let templateMessage;
  if (template) {
    templateMessage = getTemplate(template, templateArgs);
  }
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // 또는 사용하고자 하는 이메일 서비스
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      type: 'OAUTH2',
      user: process.env.MAIL_USER,
      clientId: process.env.MAIL_CLIENT_ID,
      clientSecret: process.env.MAIL_CLIENT_SECRET,
      refreshToken: process.env.MAIL_REFRESH_TOKEN,
    },
  });
  // Handlebars 템플릿 엔진 설정
  const handlebarOptions = {
    viewEngine: {
      extname: '.hbs', // 파일 확장자
      partialsDir: resolve('./views'), // 파셜 템플릿 위치
      defaultLayout: false, // 기본 레이아웃 사용 안 함
    },
    viewPath: resolve('./views'), // 템플릿 파일 경로
    extName: '.hbs',
  };

  const mailOptions = { to, from: 'tb25271@gmail.com', subject, text, html: templateMessage };

  return transporter.sendMail(mailOptions);
}

function getTemplate(emailTemplate: EmailTemplate, teamplateArgs: any) {
  const teamplatePath = join(process.env.PWD, `/templates/${emailTemplate.path}`);
  const emailTemplateSource = readFileSync(teamplatePath, 'utf8');
  const template = compile(emailTemplateSource);
  const htmlSendMessage = template({ ...teamplateArgs });
  return htmlSendMessage;
}

// 워커 쓰레드가 시작되면 이메일을 보냅니다.
(async () => {
  try {
    const { to, subject, text, template, templateArgs } = workerData;
    const result = await sendEmail({ to, subject, text, template, templateArgs });
    parentPort.postMessage(result); // 메인 스레드로 결과 전송
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
})();
