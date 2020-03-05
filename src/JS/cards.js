import Modal from "./plugins/Modal/modalV2";
import ConfirmModal from "./plugins/ConfirmModal/ConfirmModal";
const cards = [
    {
        title:'Cat',
        price: 2000,
        img:'https://avatars.mds.yandex.net/get-pdb/1662426/fcdca240-1ef4-42cc-abd3-dc008be2accf/s1200',
        description:"Whether your kitty meows or roars, it is a " +
            "descendant of the Felis silvestris species, which is" +
            " divided into the African wildcat, European wildcat and " +
            "Steppe wildcat."
    },
    {
        title:'Mini Pig',
        price: 3000,
        img:'https://avatars.mds.yandex.net/get-pdb/28866/9e621233-36ec-4e34-a372-9829f00a67ed/s1200',
        description:"The pig is an animal. It is a domestic animal. There " +
            "are many kinds of pigs. Most of them are farm animals. " +
            "But some people keep pigs at home as home pets."
    },
    {
        title:'Dog',
        price: 2500,
        img:'https://avatars.mds.yandex.net/get-pdb/234183/f40acd9b-e11f-4be7-a433-1dc74dc389b9/s1200',
        description:"«Do you like dogs? I adore them, really. I think God" +
            "created them to give a human an eternal friend which will" +
            " never betray him or do something wrong. Once I heard a " +
            "saying: “They (dogs) are just a page in the book of our " +
            "life while we are their life”. I think it's true because " +
            "only dog loves you anyway, without hesitation, doubt or " +
            "criticism. It's just about my dog.»"
    }

];

const __deleteCard =(id)=>{
    const delCard = document.querySelector(`#card_${id}`);
    delCard.parentNode.removeChild(delCard);
};

const __addBtn=()=>{

    for (let i=0; i<cards.length;i++){
        const aboutBtn = document.querySelector(`#aboutBtn-${i}`);
        aboutBtn.onclick = ()=>{
            const newModal = new Modal(
                {
                    title:cards[i].title,
                    body:`<p>${cards[i].description}</p>`
                }
            );
            newModal.open();
        };
        const deleteBtn = document.querySelector(`#deleteBtn-${i}`);
        deleteBtn.onclick = ()=>{
            /*const newModal = new Modal({
                title:'Delete',
                body: '<p>Are you sure you want to delete the card?</p>',
                footerButtons:[
                    {
                        text:'Cancel',
                        type:'btn',
                        closable: true
                    },
                    {
                        type:'btn-danger',
                        text:'Ok',
                        handler:()=>{
                            __deleteCard(i)
                        },
                        closable: true
                    }

                ]
            });
            newModal.open();*/
            ConfirmModal({
                title: 'Delete',
                body: '<p>Are you sure you want to delete the card?</p>',
            }).then(()=>{
                __deleteCard(i)
            }).catch(()=>{})
        };
    }
};
export default ()=>{
    const cardsSection = document.createElement('section');
    cardsSection.classList.add('cards');
    const container = document.createElement('div');
    container.classList.add('container');
    const wrap = document.createElement('div');
    wrap.classList.add('cards-wrapper');
    cards.forEach((card,index)=>{
        const domCard = document.createElement('div');
        domCard.classList.add('card');
        domCard.id = `card_${index}`;
        domCard.insertAdjacentHTML('afterbegin',
            `
                    <img src=${card.img} alt=${card.title}>
                    <div class="card__title">
                        ${card.title}
                    </div>
                    <div class="card__btn-block">
                        <button id='aboutBtn-${index}' class="btn">About</button>
                        <button id='deleteBtn-${index}' class="btn">Delete</button>
                    </div>
                    `
            );
        wrap.appendChild(domCard);
    });
    container.appendChild(wrap);
    cardsSection.appendChild(container);
    document.body.appendChild(cardsSection);
    __addBtn();
    return cardsSection
};



