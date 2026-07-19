// LOAD CHATBOT HTML

fetch("/components/chatbot.html")

.then(response=>response.text())

.then(data=>{

document.getElementById("chatbot-container")
.innerHTML=data;


});




// OPEN CLOSE


function openChat(){

document
.getElementById("egxChat")
.classList
.add("active");

}



function closeChat(){

document
.getElementById("egxChat")
.classList
.remove("active");

}




// ADD RESPONSE


function showResponse(message){


let chat=document.getElementById("chatBody");


chat.innerHTML += `

<div class="chat-response">

${message}

</div>

`;


chat.scrollTop=chat.scrollHeight;


}





// BUTTON ACTIONS


function getQuote(){


showResponse(`

<b> Get a Free Quote</b>

<br><br>

Fill Quote Form via Contact Us Page Including below deatils,

<br><br>

✓ Shipment Type

<br>
✓ Origin & Destination

<br>
✓ Cargo Details

<br>
✓ Weight / Volume

<br>
✓ Required Timeline

<br><br>


`);

}




function trackShipment(){


showResponse(`


<b> Track Your Shipment</b>

<br><br>

Please contact our support team via WhatsApp or Email and give below details to track your shipment:

<br><br>

✓ Shipment Number

<br>
✓ Reference Number

<br>
✓ Customer Details


<br><br>


`);

}




function joinEGX(){


showResponse(`


<b> Join EGX Force</b>


<br><br>


Build your career with EGX Supply Chain.


<br><br>


Visit our About Us Page and submit your application 


<br><br>



`);

}




function businessAdvice(){


showResponse(`


<b>🏢 Supply Chain Advice</b>


<br><br>


Need advice for your business?


<br><br>


Our experts can help with:


<br>

✓ Logistics Planning

<br>
✓ Freight Solutions

<br>
✓ Warehouse Management

<br>
✓ Supply Chain Optimization


<br><br>


Contact us via WhatsApp or Email.


`);

}





function otherQuestions(){


showResponse(`


<b>Contact EGX Team</b>


<br><br>


For any other questions:


<br><br>


 WhatsApp

<br>

Email

<br>

 Social Media


<br><br>


Our team will be happy to assist you.


`);

}





// USER MESSAGE


function sendUserMessage(){


let input=document.getElementById("userQuestion");


let question=input.value.trim();



if(question==="") return;



showResponse(question);



input.value="";



setTimeout(()=>{


botAnswer(question);


},500);


}





function botAnswer(question){

question = question.toLowerCase();


let answer = null;



egxFAQ.forEach(faq=>{


faq.keywords.forEach(keyword=>{


if(question.includes(keyword)){

answer = faq.answer;

}


});


});



if(answer){

showResponse(answer);

}

else{


showResponse(`

<b>Thank you for contacting EGX Supply Chain.</b>

<br><br>

We would be happy to understand your requirement.

<br><br>

Please select one of the options above or  tell us your requirement.

`);

}


}

document.addEventListener("mouseover", function(e){

if(
e.target.closest(".egx-chatbot button") ||
e.target.closest(".egx-chatbot a")
){

document
.querySelector(".cursor-ring")
?.classList.add("hover");

}

});



document.addEventListener("mouseout", function(e){

if(
e.target.closest(".egx-chatbot button") ||
e.target.closest(".egx-chatbot a")
){

document
.querySelector(".cursor-ring")
?.classList.remove("hover");

}

});