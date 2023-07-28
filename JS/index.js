window.addEventListener('DOMContentLoaded', (event) => {

  const radioButtons = document.querySelectorAll('input[name="size"]'),
  ingredients = document.querySelectorAll(".ingridients > div"),
  priceResult = document.querySelector(".price > p"),
  saucesResult = document.querySelector(".sauces > p"),
  topingResult = document.querySelector(".topings > p"),
  imageDropArea = document.querySelector(".table"),
  submitButton = document.getElementsByName("btnSubmit")[0],
  resetButton = document.getElementsByName("cancel")[0];




  let ingrPrice = "";
  let totalPrice = 0;
  let startPrice = 0;

  function price (ingrPrice, startPrice) {

    let priceArray;
    priceArray = ingrPrice.split(',');
    console.log(priceArray );

    totalPrice = sumPrice(priceArray, startPrice);
    priceResult.textContent = "PRICE:" + totalPrice;
  }

  function sumPrice(arr, pr){
    let x = 0;

    for( let i = 0; i < arr.length; i++ ){
      x += +arr[i]; 
    }
    pr+=x;
    return pr;
    
  }



  for(let i = 0; i < radioButtons.length; i++){ 
    let radioButton =   radioButtons[i];
    radioButton.addEventListener('change', function(e) {
      let val = e.target.value;
          
      e.target.setAttribute('checked', 'true');
          
      for (let k = 0; k < radioButtons.length; k++) {
        if(k!=i) {
          radioButtons[k].removeAttribute('checked', 'true');
        }
      }
        if (val=== "small") {
          startPrice = 200; 
      } 

      if (val=== "mid") {
          startPrice = 300;
      }
      if (val === "big") {
          startPrice = 400;
      }
      
      console.log(val);
      price (ingrPrice, startPrice);
        
        //console.log(startPrice);
    });
  }

    //console.log(startPrice);


    function Ingredien(id, name, price ) { 
      this.id = id;
      this.ingredName = name;
      this.ingredPrice = price;
    }

  const ingreds = [
  new Ingredien("moc1","Cheddar","10"), 
  new Ingredien("moc2","Feta","20"), 
  new Ingredien("moc3","Mozarella",30), 
  new Ingredien("telya","Veal",30),
  new Ingredien("vetch1","Tomatoes",10),
  new Ingredien("vetch2","Mushrooms",20),
  new Ingredien("sauceClassic","Ketchup", 10),
  new Ingredien("sauceBBQ","BBQ",20),
  new Ingredien("sauceRikotta","Ricotta",30)
  ];

  let map = new Map();

  ingreds.forEach(function(elem) {
  map.set(elem.id, elem.ingredName)
  });

  let map1 = new Map();

  ingreds.forEach(function(elem) {
    map1.set(elem.id, elem.ingredPrice)
  });

  console.log(map1)


  //At the beginning of the drag, we will add the selected class to the list element on which the event was fired.
  //After the end of dragging, we will delete this class.


  ingredients.forEach(function(elem) {
    elem.addEventListener('dragstart', (e) => {
    e.target.classList.add('selected');
    console.log('dragStart')
  })
  });

  ingredients.forEach(function(elem) {
    elem.addEventListener('dragend', (e) => {
    e.target.classList.remove('selected');
    console.log('dragEnd')
  })
  });


  imageDropArea.addEventListener('dragover', (e) => {
    // Allow dropping elements into this area
    e.preventDefault();
      
    // Find the element to be moved
    const activeElement = document.querySelector('.selected');
    //console.log( activeElement);
    // Find the element the cursor is currently over
    const currentElement = e.target;
    // Check if the event fired:
    // 1. not on the element we are moving,
    // 2. exactly on pizza
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains('.table');
    //console.log('dragOver')
    console.log(isMoveable );
    // Если нет, прерываем выполнение функции
    if (!isMoveable) {
      return;
    }
  });


  imageDropArea.addEventListener('drop', (e) => {
    
    e.preventDefault();
    const activeElement = document.querySelector('.selected');
    let droppedImg = imageDropArea.appendChild(activeElement.cloneNode());
      
    droppedImg.classList.replace("selected", "dropped");
      
    const sauceIdArr = ["sauceClassic","sauceBBQ","sauceRikotta"];
    if (sauceIdArr.includes(droppedImg.id)){
    saucesResult.textContent += map.get(droppedImg.id) + ",";
    } else {
      topingResult.textContent += map.get(droppedImg.id) + ",";
    }
      
    ingrPrice += map1.get(droppedImg.id)+",";

    price (ingrPrice, startPrice);
    
    console.log('Drop')
      
  });


  resetButton.addEventListener('click', (e) => {
    document.forms[1].reset(); // Reset the form
  });

  submitButton.addEventListener('click', (e) => {
    document.forms[1].requestSubmit(); // Submit the form
  });


  document.forms[1].addEventListener("submit", (e) => {
    let isValid = true;

    const myName = document.getElementsByName("name")[0],
    phone = document.getElementsByName("phone")[0],
    email = document.getElementsByName("email")[0];
        
        

      // если условие сработает, значение в форме будет считаться не правильным.
    if (myName.value.length === 0) {
      isValid = false;    
    }

    if (phone.value.length === 0) {
      isValid = false;
        
    }

    if (email.value.length === 0) {
      isValid = false;
        
    }
    
      // В случае если форма заполнена не правильно - отображаем сообщение об ошибке 
      // и предотвращаем отправку запроса с помощью вызова preventDefault()
      
    if (!isValid) {
      e.preventDefault();
      alert("All form fields must be filled");
    }

    
    const patternPhone = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/,
    patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    patternName = /[a-zA-Z0-9]+$/;

    let isValid2 = false;

    if (patternName.test(myName.value) && patternPhone.test(phone.value) && patternEmail.test(email.value)) {
      isValid2 = true;
    }


    if (!patternName.test(myName.value)) {
      e.preventDefault();
      alert(`String  ${myName.value} does NOT fit the pattern`);
    }
  
    if (!patternPhone.test(phone.value)) {
      e.preventDefault();
      alert(`String  ${phone.value}  does NOT fit the pattern`);
    }
    

    if (!patternEmail.test(email.value)) {
      e.preventDefault();
      alert(`Строка  ${email.value}  does NOT fit the pattern`);
    }

    if (isValid && isValid2 == true){
      e.preventDefault();
      document.location.href ="./thank-you.html";
    }

  });

});


