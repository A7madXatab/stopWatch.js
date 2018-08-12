let startButton;
let pauseButton;
let resetButton;
class Component
{
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer
{
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen () {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}

class stopWatch extends Component
{
    constructor(){
        super();
        this.isOn = false;
        this.timer;
        this.hour=0;
        this.mins =0;
        this.seconds = 0;
        this.milliseconds =0;
        this.str =this.hour+":"+this.mins+":"+this.seconds+":"+this.milliseconds;
        this.render();
    }
    render(){
        let parentDiv = $("<div>");
        let timerDiv = $("<div>").addClass("stopWatch").html(this.str);
        let buttonsDiv = $("<div>").addClass("buttons");
        this.addButtons(buttonsDiv);
        buttonsDiv.append(resetButton);
        parentDiv.append(timerDiv);
        parentDiv.append(buttonsDiv);
        return parentDiv[0];
    }
    addButtons(buttonsDiv){
        startButton =$("<button>").addClass("btn startButton").html("Start");
        startButton.on("click",()=>{this.start()});
        startButton.mouseenter(function(){
            $(".btn.startButton").animate({color:"red"});
        })
        buttonsDiv.append(startButton);

        pauseButton = $("<button>").addClass("btn pauseButton").html("Pause");
        pauseButton.on("click",()=>{
            if(!this.isOn)
            clearTimeout(this.timer);
            else 
            this.start();
        })
        buttonsDiv.append(pauseButton);

        resetButton = $("<button>").addClass("btn resetButton").html("Reset");
        resetButton.on("click",()=>{
         this.hour = 0;
         this.seconds=0;
         this.mins = 0;
         this.milliseconds=0;
         this.str =this.hour+":"+this.mins+":"+this.seconds+":"+this.milliseconds;
         this.notify();
        })
        buttonsDiv.append(resetButton)
    }
    start(){
     
        this.timer= setInterval(()=>{
            this.milliseconds++;
            if(this.milliseconds>=1000)
             {
                 this.milliseconds = 0;
                 this.seconds++;
                  if(this.seconds>=60)
                   {
                       this.seconds = 0;
                       this.mins++;
                        if(this.mins>=60)
                          {
                              this.mins=0;
                              this.hour++;
                          }
                   }
             }
           let hourCopy = this.hour<10?"0"+this.hour:this.hour;
           let minsCopy = this.mins<10?"0"+this.mins:this.mins;
           let secondsCopy = this.seconds<10?"0"+this.seconds:this.seconds;
           let millisecondsCopy = this.milliseconds<100?"0"+this.milliseconds:this.milliseconds;
           
           this.str=hourCopy+":"+minsCopy+":"+secondsCopy+":"+millisecondsCopy;
           this.notify();
           },4)
        
    }
}