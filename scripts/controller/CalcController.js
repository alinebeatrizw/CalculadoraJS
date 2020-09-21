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

    getLastOperation(){
       return this._operation[this._operation.length-1];//this._operation.length-1 pega o ultimo elemento do array (-1 pq tem uma posição a mais sempre pq começa em 0)
    }

    isOperator(value){
        //indexOf  busca o valor no array, se encontra traz a posição, senao, traz o valor -1
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)
    }
    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }
    addOperation(value){
        //verifica se o ultimo elemento é numero ou sinal
        if(isNaN(this.getLastOperation())){//this.getLastOperation() é o ultimo valor que foi digitado
            //string
            if(this.isOperator(value)){
                //trocar operador
                this.setLastOperation(value);
            }
            else if(isNaN(value)){
                 console.log(value);
            }
            else{
                this._operation.push(value);
            }
        }
        else{
            //numero
            let newvalue = this.getLastOperation().toString() + value.toString(); //converte em string pra concatenar em vez de somar quando um novo numero é digitado
            this.setLastOperation(parseInt(newvalue));
        }
        
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
                this.addOperation('+');
                break;
            case 'subtracao': 
                this.addOperation('-');
                break;
            case 'divisao': 
                this.addOperation('/');
                break;
            case 'porcento': 
                this.addOperation('%');
                break;
            case 'multiplicacao': 
                this.addOperation('*');
                break;
            case 'igual': 
                
                break;
            case 'ponto':
                this.addOperation('.');
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