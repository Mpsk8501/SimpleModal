import Modal from "./plugins/Modal/modalV2";

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
    const Modal = new Modal(
        {
            title:'class modal',
            animType:1,
            preventClose:true,
            footer: `<button id="modal_btn_ok" class="btn">OK</button>
                     <button id="allowClose" class="btn">Allow/deni</button>`
        }
    );

    document.querySelector('#allowClose').addEventListener('click',()=>{
        Modal.allowDeniClose()
    });
    document.querySelector('#modal_btn_ok').addEventListener('click',()=>{
        Modal.close()
    });
    Modal.open();


});
document.querySelector('#modal2').addEventListener('click', () => {
    const Modal = new Modal(
        {
            type:'success',
            title: 'class modal#2',
            animType: 2,
            preventClose:true,
            crossClose:true
        }
    );
    document.querySelector('#modal_btn_ok').addEventListener('click',()=>{
        Modal.close()
    });

    Modal.open();
    setTimeout(()=>{
        Modal.setContent(
            `<div>New content</div>`
        );
        Modal.allowDeniClose();
    },2000)

});




