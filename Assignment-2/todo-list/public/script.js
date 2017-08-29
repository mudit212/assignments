//AJAX -- xmlhttprequest object
// make request to the server
//1.without reloading the code
//2.asynchronously

console.log('Is this file loading');
const RESPONSE_DONE=4;
const STATUS_OK=200;
const TODO_LIST_ID ='todo_list_div';

function add_todo_element(id,todo_data_json){

    var parents=document.getElementById(id);
    parents.innerText=todo_data_json;
}

function getTofosAJAX() {

    var xhr=new XMLHttpRequest();
    xhr.open("GET",'/api/todos',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == RESPONSE_DONE)
        {
            //is statuscode is OK

            if(xhr.status ==STATUS_OK)
            {
                add_todo_element(TODO_LIST_ID,xhr.responseText);
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);

}