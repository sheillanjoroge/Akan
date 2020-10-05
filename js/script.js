function validate(){
    checkFilled();    
}
//This function checks if there are any empty fields.
function checkFilled(){
    
    var day = document.forms['namingForm']['day'].value;
    var month = document.forms['namingForm']['month'].value;
    var year = document.forms['namingForm']['year'].value;
    var gender = document.getElementsByName('gender');

    //Check for gender selected.
    if(gender[0].checked == true){
        gender = "male";
    }else if(gender[1].checked == true){
        gender = "female";
    }else{
        gender = "";
    }
    //Checks for info not provided or errors.
    var defaultErr = document.getElementById('danger-notif');
    var genderErr = document.getElementById('gender-notif');
    var yearErr = document.getElementById('year-notif');
    var monthErr = document.getElementById('month-notif');
    var dayErr = document.getElementById('day-notif');
    
    

    if(year === "" || month === "" || day === "" || gender === ""){
        defaultErr.style.display = "inline";
        genderErr.style.display = "none";
        yearErr.style.display = "none";
        monthErr.style.display = "none";
        dayErr.style.display = "none";
        
    }else{
        if(defaultErr.style.display == "inline"){
            defaultErr.style.display = "none";
        }
    }
    
    checkWhichNotFilled(day, month, year, gender);
}

function allFilled(day, month, year, gender){
    if(day !== "" && month !== "" && year !== "" && gender !== ""){
        document.getElementById('danger-notif').style.display = "none";
        document.getElementById('gender-notif').style.display = "none";
    }
    validNumbers(day, month, year, gender);
}
function validNumbers(day, month, year, gender){
    var counter = 0;
    var dayErr = document.getElementById('day-notif');
    var monthErr = document.getElementById('month-notif');
    var yearErr = document.getElementById('year-notif');

    if (day < 1 || day > 31){
        dayErr.innerHTML = "";
        var text = document.createTextNode("Please correct your day. ");
        document.getElementById('day').style.borderColor = "red";
        dayErr.appendChild(text);
        dayErr.style.display = "inline";
        counter++;
    }else{
        if(dayErr.style.display == "inline"){
            dayErr.style.display = "none";
        }
    }
    if(month < 1 || month > 12){
        monthErr.innerHTML = "";
        var text = document.createTextNode("Please correct your month. ");
        document.getElementById('month').style.borderColor = "red";
        monthErr.appendChild(text);
        monthErr.style.display = "inline";
        counter++;
    }else{
        if(monthErr.style.display == "inline"){
            monthErr.style.display = "none";
        }
    }
    if(year > new Date().getFullYear()){
        var year = new Date().getFullYear();
        yearErr.innerHTML = "";
        var text = document.createTextNode("Year can't be greater than " +year);
        document.getElementById('year').style.borderColor = "red";
        yearErr.appendChild(text);
        yearErr.style.display = "inline";
        counter++;
    }else if(year < 1900){
        yearErr.innerHTML = "";
        var text = document.createTextNode("Year can't be that old!");
        document.getElementById('year').style.borderColor = "red";
        yearErr.appendChild(text);
        yearErr.style.display = "inline";
        counter++;
    }else{
        if(yearErr.style.display == "inline"){
            yearErr.style.display = "none";
        }
    }
    if(counter > 0){
        document.getElementById('man').style.display = "none";
        document.getElementById('girl').style.display = "none";
        return;
    }else{
        findBirthday(day, month, year, gender);
    }
    
}
function checkWhichNotFilled(day, month, year, gender){
    var dayInput = document.getElementById('day');
    var monthInput = document.getElementById('month');
    var yearInput = document.getElementById('year');
    var counter = 0;

    if(day === ""){
        dayInput.style.borderColor = "red"; 
        counter++;
    }
    if(month === ""){
        monthInput.style.borderColor = "red"; 
        counter++;
    }
    if(year === ""){
        yearInput.style.borderColor = "red"; 
        counter++;
    }
    if(day !== ""){
        dayInput.style.borderColor = "#ced4da"; 
    }
    if(month !== ""){
        monthInput.style.borderColor = "#ced4da"; 
    }
    if(year !== ""){
        yearInput.style.borderColor = "#ced4da"; 
    }
    if(counter > 0){
        document.getElementById('man').style.display = "none";
        document.getElementById('girl').style.display = "none";
        return;
    }else{
        if(day !== "" && month !== "" && year !== "" && gender === ""){
            document.getElementById('danger-notif').style.display = "none";
            document.getElementById('gender-notif').style.display = "inline";
            dayInput.style.borderColor = "#ced4da"; 
            monthInput.style.borderColor = "#ced4da"; 
            yearInput.style.borderColor = "#ced4da"; 

            document.getElementById('man').style.display = "none";
            document.getElementById('girl').style.display = "none";
            return;
        }else{
            allFilled(day, month, year, gender);
        }
    }
    
    
}
//This function calculates the day of the week.
function findBirthday(day, month, year, gender){
    var days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    //Day of the month.
    var day = parseInt(day, 10); 
    //Month of the year.
    var month = parseInt(month, 10); 
    var monthCopy = parseInt(month,10); 
    //Year
    var year = parseInt(year,10);

    if (month == 1) {
       monthCopy = 13;
       year = year-1;
    }
    if (month == 2) {
       monthCopy = 14;
       year = year-1;
    }
    var val1 = parseInt(((monthCopy+1)*3)/5, 10);
    var val2 = parseInt(year/4, 10);
    var val3 = parseInt(year/100, 10);
    var val4 = parseInt(year/400, 10);
    var val5 = day+(monthCopy*2)+val1+year+val2-val3+val4+2;
    var val6 = parseInt(val5/7, 10);
    var val0 = val5-(val6*7);

    var siku = days[val0];
    

    displayDay(gender, siku);
}
function displayDay(gender, siku){
    if(gender == "male"){

        //Hide the female div
        document.getElementById('girl').style.display = "none";
        
        //This makes the male div it viscible.
        var manDay = document.getElementById('siku-day');
        var manAkan = document.getElementById('man-akan');

        //Update the day of the week.
        manDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        manDay.appendChild(newDay);

        //Update the Akan name.
        manAkan.innerHTML = "";
        //Possible names for the males.
        var maleAkan = {
            "Sunday": "Kwasi",
            "Monday": "Kwadwo",
            "Tuesday": "Kwabena",
            "Wednesday": "Kwaku",
            "Thursday": "Yaw",
            "Friday": "Kofi",
            "Saturday": "Kwame"
        }
        var newName = maleAkan[siku];
        var newNameText = document.createTextNode("Akan: " + newName);
        manAkan.appendChild(newNameText);
        document.getElementById('man').style.display = "inline";
        document.getElementById('man').scrollIntoView();
    }else{

        //Hide the male div.
        document.getElementById('man').style.display = "none";
        
        //Gets the female div.
        var girlDay = document.getElementById('lady-day');
        var girlAkan = document.getElementById('lady-akan');

        //Update the day of the week.
        girlDay.innerHTML = "";
        var newDay = document.createTextNode("Day: " + siku);
        girlDay.appendChild(newDay);

        //Update the Akan name of the girl.
        girlAkan.innerHTML = "";
        var femaleAkan = {
            "Sunday": "Akosua",
            "Monday": "Adwoa",
            "Tuesday": "Abenaa",
            "Wednesday": "Akua",
            "Thursday": "Yaa",
            "Friday": "Afua",
            "Saturday": "Ama"
        }
        var newName = femaleAkan[siku];
        var newNameText = document.createTextNode("Akan: " +newName);
        girlAkan.appendChild(newNameText);
        document.getElementById('girl').style.display = "inline";
        document.getElementById('girl').scrollIntoView();
    }
    
}