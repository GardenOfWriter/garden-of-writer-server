import { parentPort, workerData } from 'worker_threads';
import * as nodemailer from 'nodemailer';
import { EmailTemplate } from './enums/teamplate.enums';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';

async function sendEmail({
  to,
  subject,
  text,
  template,
  templateArgs,
}: {
  to: string;
  subject: string;
  text: string;
  template?: EmailTemplate;
  templateArgs?: any;
}) {
  let templateMessage;
  if (template) {
    templateMessage = getTemplate(template, templateArgs);
  }

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
  // Handlebars 템플릿 엔진 설정

  const mailOptions = { to: 'cafejun17@gmail.com', from: 'tb25271@gmail.com', subject: 'Test메일', html: templateMessage };

  return await transporter.sendMail(mailOptions);
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
    console.log('error ', error);
    parentPort.postMessage({ error: error.message });
  }
})();
