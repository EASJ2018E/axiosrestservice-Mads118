import axios, { AxiosError, AxiosResponse } from "../../node_modules/axios/index";

interface customers {
    id: number
    firstName: string;
    lastName: string;
    yearOfReg: number;
}

let buttonElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllButton");
buttonElement.addEventListener("click", showAllCustomers);

let buttonFindByIdElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("idButton");
buttonFindByIdElement.addEventListener("click", showCustomerByID);

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");

let buttonDeleteElement: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteButton");
buttonDeleteElement.addEventListener("click", deleteCustomer);

let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addButton");
addButton.addEventListener("click", addCustomer);

let uri: string = "https://restcustomerservice20181026021146.azurewebsites.net/api/customer";

function showAllCustomers(): void {
    
    axios.get<customers[]>(uri)
        .then(function (response: AxiosResponse<customers[]>): void {           
            let result: string = "<ul>";
            response.data.forEach((customer: customers) => {
                result += "<li>"+ customer.id + " " + customer.firstName + " " + customer.lastName + " " + customer.yearOfReg + " " + "</li>";
            });
            result += "</ul>";
            outputElement.innerHTML = result;
        })               
}

function showCustomerByID(): void {

    let findByIdElement : HTMLInputElement = <HTMLInputElement> document.getElementById("idInput")
    let idInput : string = findByIdElement.value

    axios.get<customers>(uri + "/" + idInput)    
        .then(function(response: AxiosResponse<customers>): void         {           
            let result: string = "<ul>";          
                result += "<li>"+ response.data.id + " " + response.data.firstName + " " + response.data.lastName + " " + response.data.yearOfReg + " " + "</li>";        
            result += "</ul>";
            outputElement.innerHTML = result;
        })
    }



    function deleteCustomer(): void {

        let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
        let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
        let idInput : string = inputElement.value
               
        axios.delete(uri + "/" + idInput)
        .then(function (response: AxiosResponse<customers>): void {              
                console.log(JSON.stringify(response));
                output.innerHTML = response.status + " " + response.statusText;
            })
                     
    }

    function addCustomer(): void {
        let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentAdd");

        let addFirstNameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addFirstName");
        let addLastNameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addLastName");
        let addYearOfRegElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addYearOfReg");
        let cFirstName: string = addFirstNameElement.value;
        let cLastName: string = addLastNameElement.value;
        let cYearOfReg: number = Number(addYearOfRegElement.value);
        
        axios.post<customers>(uri, { firstName: cFirstName, lastName: cLastName, yearOfReg: cYearOfReg })
            .then((response: AxiosResponse) => { console.log("response " + response.status + " " + response.statusText); 
            output.innerHTML = response.status + " " + response.statusText;
        })
            .catch((error: AxiosError) => { console.log(error); });
            
    }
