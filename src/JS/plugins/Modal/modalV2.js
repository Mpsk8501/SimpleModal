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

export default class Modal {
    constructor(options) {
        this.defolt = {
            type: 'normal',
            title: 'No options Title',
            body: `<p>Lorem ipsum dolor sit.</p>
                  <p>Lorem ipsum dolor sit.</p>`,
            footer: `<button id="modal_btn_ok" class="btn">OK</button>`,
            animSpeed: 'fast',
            width: 600,
            animType: 4,
            crossClose: true,
            preventClose: false,
            onOpen:()=>{
                console.log('Before_open')
            },
            onClose:()=>{
                console.log('Before_close')
            }
        };
        this.crossClose = `<span class="modal-close">
                                    &times;
                                 </span>`;
        this.options = {...this.defolt, ...options};

        this.__create = () => {
            console.log('start');
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.insertAdjacentHTML('afterbegin',
                `<div class="modal-overlay">
                <div id="modalWindow" class="modal-window">
                    <div class="modal-header">
                        <span class="modal-title">
                            ${this.options.title}
                        </span>
                        ${this.options.crossClose ? this.crossClose : ''}
                    </div>
                    <div class="modal-body">
                         ${this.options.body}
                     </div>
                    <div class="modal-footer">
                        ${this.options.footer}
                    </div>
                </div>
            </div>
        `);
            modal.style.setProperty('--var-width', `${this.options.width}px`);
            modal.style.setProperty('--var-animSpeed', `${ANIM_SPEED[this.options.animSpeed] / 1000}s`);
            modal.style.setProperty('--var-overlayColor', `${TYPE[this.options.type][0]}`);
            modal.style.setProperty('--var-borderColor', `${TYPE[this.options.type][1]}`);
            document.body.appendChild(modal);
            return modal
        };
        this.newModal = this.__create();
        this.modalWindow = document.querySelector('#modalWindow');

        const modalCrossClose = document.querySelector('.modal-close');
        if (modalCrossClose) {
            modalCrossClose.addEventListener('click', () => {
                this.close()
            });
        }
        const modalOverlayClose = document.querySelector('.modal-overlay');
        modalOverlayClose.addEventListener('click', (e) => {
            if (e.target === modalOverlayClose) {
                this.close()
            }
        });


    }

    open = () => {
        this.options.onOpen();
        setTimeout(() => {
            this.newModal.classList.add('open');
            this.modalWindow.classList.add('animated', `${ANIMATION.in[this.options.animType]}`, `${this.options.animSpeed}`);
        },10)
    };

    setContent = (content) => {
        const body = document.querySelector('.modal-body');
        body.innerHTML = content
    };

    close = () => {
        if (!this.options.preventClose) {

            this.newModal.classList.add('close');
            this.modalWindow.classList.add('animated', `${ANIMATION.out[this.options.animType]}`);
            setTimeout(() => {
                this.options.onClose();
                this.destroy()
            }, ANIM_SPEED[this.options.animSpeed])
        }
    };

    allowDeniClose = () => {
        this.options.preventClose = !this.options.preventClose
    };

    destroy = () => {
        document.body.removeChild(this.newModal);
    }
}
