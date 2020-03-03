const ANIMATION = {
    in: [
        'bounceIn',
        'bounceInDown',
        'bounceInRight',
        'fadeIn',
        'fadeInDown'
    ],
    out: [
        'bounceOut',
        'bounceOutDown',
        'bounceOutRight',
        'fadeOut',
        'fadeOutDown'
    ]
};
const TYPE = {
    normal: [
        'rgba(0, 0, 0, 0.5)',
        '#535353'
    ],
    danger: [
        'rgba(235,42,35,0.51)',
        'rgb(199,0,0)',
    ],
    success: [
        'rgba(25,255,44,0.51)',
        'rgb(33,199,29)',
    ]

};

const ANIM_SPEED = {
    slow: 2000,
    slower: 3000,
    fast: 800,
    faster: 500,
};

Element.prototype.appendAfter = function (elem) {
    elem.parentNode.insertBefore(this,elem.nextSibling)
};



const __createModalFooter = (buttons)=>{

    const handler = ()=>{
        console.log('ok btn')
    };
    if(buttons.length === 0){
        const btn = {
            text:'OK',
            type:'btn',
            handler,
            closable: true
            };
        buttons.push(btn);
    }

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach(btn=>{
        const button = document.createElement('button');
        button.textContent = btn.text||'OK';
        button.classList.add(btn.type||'btn');
        button.onclick = btn.handler||handler;
        if(btn.closable){
            button.dataset.close = 'true'
        }
        wrap.appendChild(button)
    });

    return wrap
};

const __create = (options) => {
    console.log('start');
    const crossClose = `<span data-close="true" class="modal-close">
                                    &times;
                                 </span>`;


    const modal = document.createElement('div');


    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin',
        `<div class="modal-overlay" data-close ='true'>
                <div data-window class="modal-window">
                    <div class="modal-header">
                        <span data-title  class="modal-title">
                            ${options.title}
                        </span>
                        ${options.crossClose ? crossClose : ''}
                    </div>
                    <div data-content class="modal-body">
                         ${options.body}
                     </div>
                       
                </div>
            </div>
        `);
    modal.style.setProperty('--var-width', `${options.width}px`);
    modal.style.setProperty('--var-animSpeed', `${ANIM_SPEED[options.animSpeed] / 1000}s`);
    modal.style.setProperty('--var-overlayColor', `${TYPE[options.type][0]}`);
    modal.style.setProperty('--var-borderColor', `${TYPE[options.type][1]}`);

    if(options.btn){
        const footer = __createModalFooter(options.footerButtons);
        footer.appendAfter(modal.querySelector('[data-content]'));
    }
    return modal
};


export default class Modal {
    constructor(options) {
        this.defolt = {
            type: 'normal',
            title: 'No options Title',
            body: `<p>Lorem ipsum dolor sit.</p>
                  <p>Lorem ipsum dolor sit.</p>`,
            btn:true,
            footerButtons: [],
            animSpeed: 'fast',
            width: 600,
            animType: 4,
            crossClose: true,
            preventClose: false,
            onOpen: () => {
                console.log('Before_open')
            },
            onClose: () => {
                console.log('Before_close')
            }
        };


        this.options = {...this.defolt, ...options};

        this.isOpen = false;
        this.destroyed = false;
        this.closing = false;

        this.newModal = __create(this.options);
        this.modalWindow = '';

        this.listener = (e)=>{
            if (e.target.dataset.close) {
                this.close()
            }
        };
        this.newModal.addEventListener('click', this.listener);

    }

    open() {
        if(this.destroyed){
            console.log('modal destroyed')
        }
        if(!this.isOpen&&!this.closing){
            this.isOpen = true;
            document.body.appendChild(this.newModal);
            this.modalWindow = document.querySelector('[data-window]');
            this.options.onOpen();
            setTimeout(()=>{
                this.newModal.classList.add('open');
                this.modalWindow.classList.add('animated', `${ANIMATION.in[this.options.animType]}`, `${this.options.animSpeed}`);
            },10)
        }
    };

    setContent = (content) => {
        if(this.isOpen){
            const body = document.querySelector('[data-content]');
            body.innerHTML = content
        }
    };

    close = () => {
        if (!this.options.preventClose&&!this.destroyed&&!this.closing) {
            this.closing = true;
            this.newModal.classList.add('close');
            this.modalWindow.classList.add('animated', `${ANIMATION.out[this.options.animType]}`);
            setTimeout(() => {
                this.options.onClose();
                this.destroy();
                this.closing = false
            }, ANIM_SPEED[this.options.animSpeed])
        }else{
            console.log('Modal destroyed or preventClose')
        }
    };

    allowDeniClose = () => {
        this.options.preventClose = !this.options.preventClose
    };

    destroy = () => {
        this.newModal.parentNode.removeChild(this.newModal);
        this.newModal.removeEventListener('click', this.listener);
        this.destroyed = true
    }
}
