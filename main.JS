let question_field = document.querySelector(".question");
let answers_btn = document.querySelectorAll(".answer");
let container_h3 = document.querySelector(".container_h3")
let container_main = document.querySelector(".main");
let container_start = document.querySelector(".start");
let start_btn = document.querySelector(".start-btn");

let cookie = false
let cookies = document.cookie.split(";");

for(i=0; 1<cookies.length; i+1){
  if(cookies[i].split('=')[0]=='number_high_score'){
    cookie = cookies[i].split('=')[1]
    break
  }
}

if(cookie){
let data = cookie.split('/')
container_h3.innerHTML = `Минулого разу ви дали ${data[1]} правильних відповідей із ${data[0]}. Точність - ${Math.round(data[1]*100/data[0])}`
}

function randint(min,max){
  return Math.round(Math.random()*(max-min)+min)
}

let signs = ["+", "-", "*", "/"]
function getRandomSing(){
  return signs[randint(0, 3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  } 
}

my_array = [1, 2, 3, 4, 5]
shuffle(my_array)


class Question {
    constructor() {
      let a = randint(0,100)
      let b = randint(0,100)
      let sign = getRandomSing()

        this.question = `${a} ${sign} ${b}`
        if(sign == "+"){this.correct = a+b}
        else if(sign == "-"){this.correct = a-b}
        else if(sign == "*"){this.correct = a*b}
        else if(sign == "/",a!=0,b!=0){this.correct = Math.round((a/b)*100)/100}
            this.answers = [
              randint(this.correct - 15, this.correct - 5),
              randint(this.correct - 10, this.correct - 1),
              this.correct,
              randint(this.correct + 1, this.correct + 10),
              randint(this.correct + 10, this.correct + 15),
            ];
            shuffle(this.answers)
    }

display() {
    question_field.innerHTML = this.question;


    for (let i = 0; i < this.answers.length; i += 1) {
      answers_btn[i].innerHTML = this.answers[i];
    }
  }

}


let current_question = new Question;
let total ;
let correct_answers_given ;

start_btn.addEventListener("click",function(){
container_main.style.display="flex"
container_start.style.display="none"
current_question.display();
total = 0
correct_answers_given = 0

setTimeout(function(){
  container_main.style.display="none"
  container_start.style.display="flex"
  let new_cookie = `number_high_score=${total}/${correct_answers_given};max-age=31557600000`
  document.cookie=new_cookie

  container_h3.innerHTML = `Ви дали ${correct_answers_given} правильних відповідей із ${total} 
Точність - ${Math.round(correct_answers_given*100/total)}%`
},10000)
})



for (let i = 0; i < answers_btn.length; i += 1) {
  answers_btn[i].addEventListener("click", function () {
    if (answers_btn[i].innerHTML == current_question.correct) {
      correct_answers_given+=1
      console.log("Правильно");
    } else {
      console.log("Неправильно");
    }

    total += 1;
    current_question = new Question()
    current_question.display();
  });
}
