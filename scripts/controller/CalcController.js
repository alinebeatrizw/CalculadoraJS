class CalcController{

    constructor(){
        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents(); 
    }

    initialize(){

        this.setDisplayDateTime();
         
      setInterval(()=>{

        this.setDisplayDateTime();

      }, 1000); // pega a hora e a data atual e o set interval pra mudar a tela cada segundo
    
    }
    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    ClearAll(){
        this._operation = [];
    }
    ClearEntry(){
        this._operation.pop(); //pop retira o ultimo elemento de um array
    }
    addOperation(value){
        this._operation.push(value);
        console.log(this._operation);
    }
    setError(){
        this.displayCalc = "Error";
    }
    execBtn(value){
        switch(value){
            case 'ac': 
                this.ClearAll();
                 break;
            case 'ce': 
                this.ClearEntry();
                break;
            case 'soma': 
                this.ClearEntry();
                break;
            case 'subtracao': 
                this.ClearEntry();
                break;
            case 'divisao': 
                this.ClearEntry();
                break;
            case 'porcento': 
                this.ClearEntry();
                break;
            case 'multiplicacao': 
                this.ClearEntry();
                break;
            case 'igual': 
                this.ClearEntry();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
                
            default:
                this.setError();
                break;
        }
    }


    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e=> {
               let textBtn = btn.className.baseVal.replace("btn-", ""); //classname traz o nome da classe, baseval é por causa do svg criado da imagem e replace tira a escrita btn e substitui por nada pra aparecer so o numero quando clica
            
            this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor="pointer";
            });
        });

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit", 
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }


    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value;
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value;
    }
}