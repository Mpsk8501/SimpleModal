
const __create = (options) => {

    const figure = document.createElement('section');
    figure.classList.add('figure');
    figure.insertAdjacentHTML('afterbegin',
        `<div class="container">
                <div class="radius radius1">
                <div class="radius radius2">
                <div class="radius radius3">
                <div class="radius radius4">
                <div class="radius radius5">
                <div class="radius radius6">
                <div class="radius radius7">
                <div class="radius radius8">
                <div class="radius radius9">
                <div class="radius radius10">
                <div class="radius radius11">
                <div class="radius radius12">
                <div class="radius radius13">
                <div class="radius radius14">
                <div class="radius radius15">
                <div class="radius radius16">
        
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        `);

    figure.style.setProperty('--var-size', `${options.size}px`);
    figure.style.setProperty('--var-colorOne', `${options.colorOne}`);
    figure.style.setProperty('--var-colorTwo', `${options.colorTwo}`);
    figure.style.setProperty('--var-cooef', `${options.cooef}`);
    document.body.appendChild(figure);
    return figure

};


export default class Figure {
    constructor(options) {
        this.defolt = {

            animationSpeed: 5,
            size: 10,
            colorOne: 'red',
            colorTwo: 'blue',
            cooef: 32,
        };
        this.options = {...this.defolt, ...options};
        this.figure = __create(this.options);
        this.isPlayed = true;

        this.figure.addEventListener('dblclick',()=>{
            document.body.removeChild(this.figure);
        })
    }

    startAnimate =()=> {
        this.figure.style.setProperty('--var-animationSpeed', `${this.options.animationSpeed}s`);
    };
    playPause=()=>{
        if(this.isPlayed){
            this.figure.style.setProperty('--var-playState', `paused`);
            this.isPlayed = false
        }else {
            this.figure.style.setProperty('--var-playState', `running`);
            this.isPlayed = true
        }
    }

}