class Button
{
    constructor()
    {
        this.button = createButton("Start");
    }
    hide()
    {
        this.button.hide();
    }
    display()
    {
        this.button.position(width/2.5,height/1.5);
        this.button.style('width','300px');
        this.button.style('height','50px')
        this.button.style('background','#7ba303');
        this.button.style('font-size','35px');
        this.button.style('color','#3e432e')
        this.button.style('font-family','Times New Roman');
        this.button.mousePressed(()=>{
            gameState = 1;
            this.button.hide();
        });
    }
}