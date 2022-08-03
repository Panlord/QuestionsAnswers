import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s'
}

export default function () {
  http.get(`http://127.0.0.1:3000/qa/questions?product_id=${Math.floor(Math.random() * 880000)}`);
  http.get(`http://127.0.0.1:3000/qa/questions/${Math.floor(Math.random() * 3000000)}/answers?page=1&count=5`);

  let newQuestion = {
    body: 'I am a virtual user in my virtual prime. It is new question posting time.',
    name: 'k6 Robo Slinger',
    email: 'k6@gg.ez',
    product_id: Math.floor(Math.random() * 880000)
  }
  http.post(`http://127.0.0.1:3000/qa/questions`, JSON.stringify(newQuestion), {
    headers: { 'Content-Type': 'application/json' },
  });

  let newAnswer = {
    body: 'Beep boop! Locally stress testing!',
    name: 'k6 hash slinging slasher',
    email: 'k6@robo.bobo',
    photos: []
  }
  // if (Math.random() > 0.75) {
  //   newAnswer.photos = ['https://images.unsplash.com/photo-1560148271-00b5e5850812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80', 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80']
  // } else if (Math.random() < 0.1) {
  //   newAnswer.photos = ['https://images.unsplash.com/photo-1620510625142-b45cbb784397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80']
  // }
  http.post(`http://127.0.0.1:3000/qa/questions/${Math.floor(Math.random() * 3000000)}/answers`, JSON.stringify(newAnswer), {
    headers: { 'Content-Type': 'application/json' },
  });

  http.put(`http://127.0.0.1:3000/qa/questions/${Math.floor(Math.random() * 3000000)}/helpful`);
  http.put(`http://127.0.0.1:3000/qa/answers/${Math.floor(Math.random() * 6000000)}/helpful`);
  http.put(`http://127.0.0.1:3000/qa/questions/${Math.floor(Math.random() * 3000000)}/report`);
  http.put(`http://127.0.0.1:3000/qa/answers/${Math.floor(Math.random() * 6000000)}/report`);

  sleep(1);
}