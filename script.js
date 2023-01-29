// OOP: Nesne Tabanlı Programlama






document.querySelector(".btn_start").addEventListener("click", function () {
    document.querySelector(".quiz_box").classList.add("active");
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

    document.querySelector(".next-btn").classList.remove("next-btn-show");



})

document.querySelector("#next-btn").addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimerLine();
        startTimer(10);
        soruGoster(quiz.soruGetir())
        soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove("next-btn-show");


    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        document.querySelector(".quiz_box").classList.add("d-none");
        document.querySelector("#start-quiz").innerHTML = "Quiz bitti";
        console.log("quiz bitti");
        document.querySelector(".score-box").classList.add("active");
        testKontrol(quiz.sorular.length, quiz.dogruCevap)

    }
})
const option_List = document.querySelector(".option_list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

function soruGoster(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = ``;

    for (let cevap in soru.cevapSecenekleri) {
        options +=
            `<div class="option">
        <span><b>${cevap}</b>:${soru.cevapSecenekleri[cevap]}</span></div>`;
    };

    document.querySelector(".question_text").innerHTML = question;
    option_List.innerHTML = options;

    const option = option_List.querySelectorAll(".option");

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(option) {
        clearInterval(counterLine);
        clearInterval(counter);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if (soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevap += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    }
    else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for (let i = 0; i < option_List.children.length; i++) {
        option_List.children[i].classList.add("disabled");
    }
    document.querySelector(".next-btn").classList.add("next-btn-show");

}

function soruSayisiniGoster(soruSirasi, toplamSoru) {
    let tag = ` <span class="badge bg-danger btn btn-lg">${soruSirasi}/${toplamSoru}</span>`;
    document.querySelector(".quesiton-index").innerHTML = tag;
}


function testKontrol(toplamSoru, dogruCevap) {
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} soruya doğru cevap verdiniz`;
    document.querySelector(".score-text").innerHTML = tag;

}
document.querySelector(".btn_quit").addEventListener("click", function () {
    document.querySelector(".score-box").classList.add("d-none");
    // document.querySelector("#start-quiz").innerHTML="Quiz bitti";
})

document.querySelector(".btn_replay").addEventListener("click", function () {
    window.location.reload();
})

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {



        const timeSecond = document.querySelector(".time-second");
        timeSecond.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            document.querySelector(".timer-text").textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for (let option of option_List.children) {
                if (option.querySelector("span b").textContent == cevap) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);

                }
                option.classList.add("disabled");

            }
            document.querySelector(".next-btn").classList.add("next-btn-show");

        }
    }
}
const timeLine = document.getElementById("time-line");
let counterLine;
function startTimerLine() {
    let lineWidth = 0;
    counterLine =setInterval(timer, 20);
    
    function timer() {
        
        lineWidth += 1;
        timeLine.style.width=lineWidth+"px";
        if(lineWidth>547)
        clearInterval(counterLine)
        
       
        

    }



}