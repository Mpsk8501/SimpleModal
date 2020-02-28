import Modal from "./plugins/Modal/modalV2";
import Figure from "./plugins/Figure/Figure";

/*
* options:
* type: normal/danger/success - str
* title: modal title - str/html
* body: modal body - str/html
* footer: modal footer - str/html
* crossClose: - bool крестик
* preventClose - можно ли закрыть окно (значение по умолчанию - false;
* если true то для закрытия нужно вызвать allowDeniClose())
* onOpen - функция - выполняется при открытии
* onClose - функция - выполняется при закрытии
* animType - тип анимации num(0-4)
* animSpeed - скорость анимации slow,slower,fast,faster, - str
*
* методы:
* setContent(html/str) - изменяет body
* open -
* close -
* allowDeniClose - разрешает/запрещяет закрытие
*/

document.querySelector('#modal1').addEventListener('click', () => {
    const myModal = new Modal(
        {
            title:'class modal',
            animType:1,
            preventClose:true,
            footer: `<button id="modal_btn_ok" class="btn">OK</button>
                     <button id="allowClose" class="btn">Allow/deni</button>`
        }
    );
    myModal.open();

    document.querySelector('#allowClose').addEventListener('click',()=>{
        myModal.allowDeniClose()
    });
    document.querySelector('#modal_btn_ok').addEventListener('click',()=>{
        myModal.close()
    });



});
document.querySelector('#modal2').addEventListener('click', () => {
    const myModal = new Modal(
        {
            type:'success',
            title: 'class modal#2',
            animType: 2,
            animSpeed:'slow',
            preventClose:true,
            crossClose:true
        }
    );
    myModal.open();

    document.querySelector('#modal_btn_ok').addEventListener('click',()=>{
        myModal.close()
    });

    setTimeout(()=>{
        myModal.setContent(
            `<div>New content</div>`
        );
        myModal.allowDeniClose();
    },2000)

});

document.querySelector('#figure1').addEventListener('click', () => {
    const myFigure = new Figure();
    myFigure.startAnimate();
});

document.querySelector('#figure2').addEventListener('click',()=> {
    const myFigure = new Figure(
        {
            size: 8,
            colorOne: 'green',
            colorTwo: 'blue',
            animationSpeed: 2
        }
    );
    myFigure.startAnimate();

    document.querySelector('.figure').addEventListener('click', () => {
        myFigure.playPause()
    })
});





