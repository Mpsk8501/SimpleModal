import Modal from "./plugins/Modal/modalV2";
import Figure from "./plugins/Figure/Figure";
import Cards from "./cards"




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

Cards();




document.querySelector('#modal1').addEventListener('click', () => {
    const myModal = new Modal(
        {
            title:'class modal',
            animType:1,
            btn:false
        }
    );
    myModal.open();
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

    setTimeout(()=>{
        myModal.setContent(
            `<div>New content</div>`
        );
        myModal.allowDeniClose();
    },2000)

});

document.querySelector('#modal3').addEventListener('click', () => {
    const myModal = new Modal(
        {
            title:'class modal#3',
            animType:1,
            footerButtons: [
                {
                    type:'btn-danger',
                    text:'Cancel',
                    closable:true,
                },
                {
                    handler:()=>{
                        console.log('modal#3 btn clicked')
                    }
                }
            ]
        }
    );
    myModal.open();
});


document.querySelector('#figure1').addEventListener('click', () => {
    new Figure(
        {
            animationSpeed: 1,
            cooef:32,
            size:8
        }
    );
});

document.querySelector('#figure2').addEventListener('click',()=> {
    new Figure(
        {
            colorOne: 'green',
            colorTwo: 'red',
            animationSpeed: 2
        }
    );
});
document.querySelector('#figure3').addEventListener('click',()=> {
    new Figure(
        {
            colorOne: 'blue',
            colorTwo: 'blue',
            animationSpeed: 1,
            cooef:32
        }
    );
});
document.querySelector('#figure4').addEventListener('click',()=> {
    new Figure(
        {
            colorOne: 'blue',
            colorTwo: 'orange',
            animationSpeed: 1,
            cooef:256
        }
    );
});
document.querySelector('#figure5').addEventListener('click',()=> {
    new Figure(
        {
            colorOne: 'crimson',
            colorTwo: 'orange',
            animationSpeed: 1,
        }
    );
});







