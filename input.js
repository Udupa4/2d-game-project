export class InputHandler {
    constructor(){
        this.keys = [];

        window.addEventListener('keydown', e => {
            if((e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' || 
                e.key === 'ArrowLeft' || 
                e.key === 'ArrowRight' ||
                e.key === 's' || 
                e.key === 'w' || 
                e.key === 'a' || 
                e.key === 'd' ||
                e.key === 'Enter' ||
                e.key === ' ')
                && this.keys.indexOf(e.key) === -1)
            {
                this.keys.push(e.key);
            }
            console.log(this.keys);
        });

        window.addEventListener('keyup', e => {
            if((e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' || 
            e.key === 'ArrowLeft' || 
            e.key === 'ArrowRight' ||
            e.key === 's' || 
            e.key === 'w' || 
            e.key === 'a' || 
            e.key === 'd' ||
            e.key === 'Enter' ||
            e.key === ' ')
            && this.keys.indexOf(e.key) > -1)
            {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(this.keys);
        });

        // window.addEventListener('click', e =>{
        //     e.key = 'click';
        //     if(this.keys.indexOf(e.key) === -1)
        //         this.keys.push(e.key);
        // });
    }
}