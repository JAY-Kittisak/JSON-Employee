# **Callback, promise, async/await 🐱‍(❁´◡`❁)🐱‍👤✨**

**Basic of JavaScript**
    อย่างแรกที่เราควรเข้าใจคือ JavaScript เกิดมาเพื่อ frontend สำหรับการทำ dynamic content หรือการเปลี่ยน content บนหน้าเว็บโดยที่ไม่ต้อง refresh ทำให้การทำงานแบบ parallel มีความสำคัญ ตัวอย่างง่ายๆ เช่น Facebook ในหน้า News Feed จะต้องโหลดโพสทั้งหมดกับหน้าตาของเว็บไปพร้อมๆ กันได้ ถ้าไม่งั้นหน้าเว็บอาจจะต้องรอโหลดโพสจำนวนมหาศาล ทำให้เราเห็นหน้าขาวๆ จนกว่าโพสจะโหลดเสร็จ

                ✔ด้วยเหตุผลนี้ JavaScript จึงทำงานแบบ Asynchronous
> **คำว่า Asynchronous หมายถึงการทำให้โค้ดสามารถรันแยกกันได้ ซึ่งจะขัดกับสามัญสำนึกของคนที่เคยเขียน C++, Java หรือ PHP มาแน่ๆ**

```js
console.log(1);
console.log(2);
console.log(3);
```
> **จากโค้ดข้างบน** *เมื่อลองรันจะได้ผลลัพธ์ดังนี้*  
```js
1
2
3
```
> จะเห็นว่าผลลัพธ์ไม่ได้น่าตกใจอะไร ทีนี้ลองดูโค้ดข้างล่างนี้
```js
console.log(1);
setTimeout(function() {
    console.log(2);
}, 500);
console.log(3);
```
> **จากโค้ดข้างบน** *เมื่อลองรันจะได้ผลลัพธ์ดังนี้*  
```js
1
3
2
```
อ้าว! ทำไม 3 ถึง log ก่อน 2 ล่ะ นั่นก็เพราะคำสั่ง setTimeout ทำให้คำสั่ง console.log(2) ถูกเรียกช้าไป 500 ms และด้วยธรรมชาติของ JavaScript มันจะรันคำสั่ง console.log(3) ก่อนโดยไม่รอ แล้วค่อยกลับไปเรียกคำสั่ง console.log(2) ทีหลัง


## *Feature นี้ของ JavaScript เป็นทั้งข้อดีและข้อเสียในเวลาเดียวกัน ข้อดีคือทำให้การทำงานด้าน frontend และอื่นๆ ที่ทำงานพร้อมกันได้ทำงานอย่างรวดเร็ว* 🤔🤔**แต่ข้อเสียที่ใหญ่หลวงที่สุดคงจะเป็นตามตัวอย่างข้างล่าง**
```js
function logUserName(id) {
    const user = getUserById(id);
    console.log(user.name);     // undefined
}
```
### ในที่นี้ฟังก์ชัน getUserName(id) ต้องการชื่อของ user ที่มี id ตามที่ระบุ ถ้าฟังก์ชัน getUserById(id) ใช้เวลานาน (ซึ่งส่วนใหญ่จะเป็นอย่างงั้น) ทำให้ฟังก์ชัน getUserName ข้ามไปทำคำสั่ง return ก่อน และทำให้ผลลัพธ์ที่ได้เป็น undefined เนื่องจากยังหา user ไม่ทันเจอก็ return ซะแล้ว…
## ✨✨✨สรุปคือ การทำงานแบบ Asynchronous มีปัญหากรณีที่เราต้องการผลลัพธ์จากโค้ดที่ใช้เวลานานไปใช้ต่อนั่นเองแล้วจะแก้ปัญหานี้ยังไง!! เราจะมาดูวิธีการแก้ปัญหานี้ไปพร้อมๆ กันเลย(ปล. ความจริงแล้ว JavaScript รันแบบ Synchronous นั่นแหละ เพียงแต่ทำให้เหมือน Asynchronous ได้ อ่านเพิ่มเติมเวอร์ชั่นอังกฤษที่นี่เลย)

# 1. ✨✨✨Callback function ✨✨✨
> Callback คืออะไร? ถ้าพูดแบบง่ายๆ callback คือ function ที่จะถูกเรียกหลัง function อื่นทำงานเสร็จ ทำให้การทำงานเป็นแบบ synchronous นั่นเอง
หน้าตาของการใช้ callback จะเป็นประมาณนี้
```js
function logUserName(id) {
    getUserById(id, function(user) {
        console.log(user.name);
    });
}
```

>จากที่ตัวอย่างที่แล้ว getUserName จะไม่รอ getUserById แล้วทำคำสั่ง return เลย ตัวอย่างนี้เราเลยจับ return ใส่ใน callback ซะ เพื่อบอกว่าให้ทำ getUserById ก่อนนะแล้วค่อยเอาผลลัพธ์ไปทำต่อ (ในที่นี้ผลลัพธ์คือ user นั่นเอง)
เนื่องจากใน JavaScript จะมอง function เป็น object ด้วย ทำให้เราสามารถส่ง function เป็น parameter และ return กลับมาได้ด้วย ซึ่งจะเรียก function ที่ทำอย่างงั้นได้ว่า higher-order function นั่นเอง
และแน่นอน ถ้าใครรู้เรื่อง arrow function อยู่แล้ว callback เราก็สามารถเป็น arrow function ได้เลย

```js
function logUserName(id) {
    getUserById(id, user => console.log(user.name));
}
```
>ที่สำคัญ callback ยังซ้อนกันได้ด้วยนะ!! แปลว่า ใน callback ก็มี callback อีกอันที่มี callback ที่มี callback ไปเรื่อยๆ ได้
สมมติว่าเราต้องการเลขประจำตัวนักเรียนจากชื่อ-นามสกุลเพื่อไปหาว่านักเรียนอยู่ห้องไหนและครูประจำชั้นเป็นใคร หน้าตาโค้ดก็จะประมาณนี้
```js
function logHomeroomTeacher(studentName) {
    getStudentIdByName(studentName, id => {
        getRoomByStudentId(id, room => {
            getTeacherByRoom(room, console.log);
        });
    });
}
```

>อันนี้แค่น้ำจิ้มนะครับ ถ้ามันซ้อนกันมากกว่านี้ล่ะก็ รับรองนรกมาเยือนแน่นอน อาการป่วยแบบนี้เรียกว่า callback hell (ไม่ได้ล้อเล่นนะ เค้าเรียกกันอย่างงี้จริงๆ) ถ้าไม่รีบรักษาจะมีโรคแทรกซ้อนตามมาอีกหลายอย่าง เช่น

*   โค้ดอ่านยาก ไม่รู้เรื่อง (ตัวอย่างนี้แค่สามชั้นก็ตายแล้วครับ)
*   การดักจับ error ทำยากมากๆๆๆๆๆ
    
เพราะงั้น เลิกเหอะนะ การเขียนโค้ดแบบเนี่ย!!

# 2. ✨✨✨Promise✨✨✨
>เอาแบบง่ายๆ promise คือ object พิเศษที่เก็บ asynchronous operation บางอย่างที่เดี๋ยวจะทำเสร็จแน่ๆ นะ เปรียบเทียบกับสัญญาคลาสสิคในหนังอย่าง “ถ้าสงครามนี้จบ ข้าจะกลับมาแต่งงานกับเจ้า !” (Death flag ชัดๆ) ถ้าไม่มีสัญญานี้เจ้าสาวคงไม่รอแล้วไปแต่งกับคนอื่นชัวร์ แต่พอมีสัญญาแล้วก็แปลว่าเจ้าสาวจะรอเรากลับมาแน่นอน (ถึงแม้ส่วนใหญ่จะตายในสนามรบก็เหอะ…)
นอกเรื่องมาไกล ลองดูจากตัวอย่างที่แล้วดีกว่า

```js
function logUserName(id) {
    const user = getUserById(id);
    console.log(user.name);     // undefined
}
```

> จากตัวอย่างนี้ getUserById จะ return เป็น promise ที่เมื่อรันเสร็จแล้วจะได้ข้อมูล user มา ดังนั้น user ไม่ได้เก็บข้อมูล user อยู่ แต่เก็บ promise ของ getUserById นั่นเอง
ถ้าอยากได้ผลลัพธ์หลัง promise รันเสร็จจะทำยังไงล่ะ? ก็เรียกใช้ฟังก์ชัน then() ซะสิ!!

```js
function logUserName(id) {
    getUserById(id).then(user => console.log(user));
}
```

> แบบโค้ดนี้เลย สังเกตว่าฟังก์ชันใน .then() ก็คือ callback function นั่นแหละ แต่เราเอาออกมาเขียนข้างนอกฟังก์ชัน getUserById เพื่อให้อ่านง่าย
แน่นอนว่าเราสามารถ chain .then() ต่อๆ กันได้ แบบนี้
```js
function logHomeroomTeacher(studentName) {
    getStudentIdByName(studentName)
        .then(id => getRoomByStudentId(id))
        .then(room => getTeacherByRoom(room))
        .then(console.log);
}
```
>จะเห็นว่าโค้ดอ่านง่ายขึ้นเยอะ เพราะโค้ดแยกฟังก์ชันชัดเจนมากขึ้น และการ catch error ก็จะง่ายขึ้นโดยใช้ .catch() แบบนี้
```js
function logHomeroomTeacher(studentName) {
    getStudentIdByName(studentName)
        .then(id => getRoomByStudentId(id))
        .then(room => getTeacherByRoom(room))
        .then(console.log)
        .catch(err => {
            console.log('Error!!');
        });
}
```
>แต่!!! ฟังก์ชันไม่จำเป็นต้อง return promise เสมอไป เช่น getUserById อาจจะไม่ได้ return promise ก็ได้ เพราะงั้นถ้าจะใช้ท่านี้ก็ต้องทำให้ getUserById เป็น promise ซะก่อน

```js

function logUserName(id) {
    const promise = new Promise((resolve, reject) => {
        getUserById(id, resolve);
    });
    promise.then(user => console.log(user.name));
}
```
>จากโค้ดข้างบนจะเห็นว่าการสร้าง promise ต้องใช้ฟังก์ชันสองตัว คือ resolve กับ reject โดย resolve เป็น callback เมื่อทำงานเสร็จ ส่วน reject คือ callback เมื่อเกิด error ขึ้น
ปัญหาของ promise คือการดักจับ error จริงอยู่ที่เรามี .catch ไว้ดักจับ error อยู่แล้ว แต่เราไม่สามารถ .then ต่อจาก .catch ได้ ทำให้เวลามี error เข้า .catch จะไม่รู้เลยว่ามาจาก promise ตัวไหนใน chain

# 3. ✨✨✨Async/Await✨✨✨
>ฟีเจอร์ใหม่ใน ES2017 พระเอกขี่ม้าขาวที่จะทำให้โค้ด clean ขึ้นทันตาเห็น เพราะ async/await ทำให้เราเขียนโค้ดแบบ synchronous ได้เลย
วิธีการใช้ async ก็ง่ายมาก แค่นี้…
```js
async function getUserName() {
    return 'UtopiaBeam';
}
```
>ข้อที่ต้องจำไว้อย่างนึงคือ async function จะ return promise เสมอ ดังนั้นเราสามารถ getUserName().then() หรือ .catch() อย่างงี้
```js
async function util() {
    getUserName().then(name => {
        console.log('Username:', name);
    });
}
```
>แต่จะคูลให้สุดต้องใช้ await ด้วย ตามนี้
```js
async function util() {
    const name = await getUserName();
    console.log('Username:', name);
}
```
>await ใช้ได้ในเฉพาะ async function เท่านั้น โดยใส่ await หน้า async function เพื่อให้ฟังก์ชันหยุดการทำงานจนกว่า async function นั้นจะทำงานเสร็จ หรือพูดอีกแบบคือ await คือการสั่งให้ resolve promise ก่อนจะไปต่อนั่นเอง
การ handle error ก็ง่ายมาก ใช้วิธีคลาสสิคอย่าง try/catch ได้เลย
```js
async function util() {
  try {
    const name = await getUserName();
    console.log('Username:', name);
  } catch (err) {
    console.error(err);
  }
}
```
>อย่างที่เห็น ด้วยพลังแห่ง async/await โค้ดของเราจะดู clean และเขียนง่ายขึ้นมาทันที เหมือนกับที่เราเขียน synchronous code เลย
จริงๆ แล้วเรื่องนี้มีประเด็นที่น่าพูดถึงอีกมาก แต่อยากให้ลองไปศึกษากันเอง (จริงๆ คือขี้เกียจใส่มาเพราะมันเยอะ = =) เพราะเป็น concept ที่สำคัญมากเวลาทำงานกับ JavaScript และ TypeScript
สำหรับบทความนี้ก็จบเพียงเท่านี้นะครับ ใครมีข้อสงสัยสามารถถามใน comment ด้านล่างได้เลยนะครับ เจอกันบทความหน้าครับ (> <)

[Refer Link  ลิ้งอ้างอิง ](https://medium.com/thinc-org/callback-promise-async-await-%E0%B8%A7%E0%B8%B2%E0%B8%A2%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%A2-%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87-javascript-f5a842e59d9e)