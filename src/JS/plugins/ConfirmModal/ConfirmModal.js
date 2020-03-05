import Modal from "../Modal/modalV2";

export default (options) =>{
    return  new Promise(((resolve, reject) => {
         const newModal = new Modal(
            {...options,
                footerButtons:[
                    {
                        text:'Cancel',
                        type:'btn',
                        closable: true,
                        handler:()=>{
                            reject()
                        },
                    },
                    {
                        type:'btn-danger',
                        text:'Ok',
                        handler:()=>{
                            resolve()
                        },
                        closable: true
                    }

                ]
            }
        );
         newModal.open()
    }))
};