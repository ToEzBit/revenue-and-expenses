let balance = document.getElementById("balance");

let num_re = document.getElementById("num_re");
let num_ex = document.getElementById("num_ex");

let list = document.getElementById("list");

let in_t = document.getElementById("in_t");
let in_a = document.getElementById("in_a");
let submit = document.getElementById("submit");

const data_list =[]

let data = data_list;

function init(){
    list.innerHTML='';
    data.forEach(add_list); //คำสั่งวนลูปดึงค่าใน array
    cal();  
}

function add_list (trans_data){
    let symbol = trans_data.amount < 0 ? '-' : '+';
    let stat = trans_data.amount < 0 ? 'minus' : 'plus';
    let item = document.createElement("li")
    item.classList.add(stat); //เพิ่ม class
    item.innerHTML = `${trans_data.text}<span>${symbol}${formatNumber(Math.abs(trans_data.amount))}</span><button class='btndel' onclick='removelist(${trans_data.id})'>x</button>`;
    list.appendChild(item)
}

function cal (){
    let numlist =  data.map(num=>num.amount); //map num ให้อยู่ในรูป array
    let result = numlist.reduce((fresult,item)=>(fresult+=item),0).toFixed(2);// 0 คือค่าเริ่มต้นที่ใช้คำนวน (คำนวนทั้งหมด)

    let rev = numlist.filter(item=>item>0).reduce((fresult,item)=>(fresult+=item),0).toFixed(2); //กรองข้อมูลที่เป็น +(คำนวนรายรับ)
    let exp = numlist.filter(item=>item<0).reduce((fresult,item)=>(fresult+=item),0).toFixed(2); //กรองข้อมูลที่เป็น -(คำนวนรายจาย)
    balance.innerText = formatNumber(result);
    num_re.innerText = formatNumber(rev);
    num_ex.innerText = formatNumber(exp);
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function addtransactions(e){
    e.preventDefault();
    if(in_t.value.trim() ===  "" || in_a.value.trim() === ""){
        alert("Please Fill out space");
    }else {
        let list_data = {
            id: genid(),
            text: in_t.value,
            amount: +in_a.value // (ใส่ + เพื่อแปลง sting เป็น num)
        }
        data.push(list_data);
        add_list(list_data);
        cal();
        in_t.value="";
        in_a.value="";
     }
}

function genid(){
    return Math.floor(Math.random()*10000000);
}

function removelist(id){
    data = data.filter(redata=>redata.id !== id);
    init();
}

submit.addEventListener('click',addtransactions);


init();