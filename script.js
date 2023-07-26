const wrapper = document.querySelector(".wrapper");
const input = document.querySelector(".form input");
const qrImg = document.querySelector(".qr-code img")
const generateBtn = document.querySelector(".form button");
const closeBtn = document.querySelector(".close");
const saveBtn = document.querySelector(".save");



generateBtn.addEventListener("click",() => {
    let qrInput = input.value;
    if (!qrInput) return;
    generateBtn.innerHTML= "Generating QR Code.....";
    qrImg.src= `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInput}`;
    qrImg.addEventListener("load",() => {
        wrapper.classList.add("active");
        generateBtn.innerHTML = "Generate QR Code";
    })
})

input.addEventListener("keyup",() => {
    if(!input.value) {
        wrapper.classList.remove("active");
    }
 });

 closeBtn.addEventListener("click",() => {
    wrapper.classList.remove("active");
    input.value = "";
 })

 saveBtn.addEventListener("click", e => {
    e.preventDefault();
    fetchFile(qrImg.src);
 })

 function fetchFile (url) {
    fetch(url).then(res =>res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href= tempUrl;
        aTag.download = input.value + " QR Code" +".png";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
    })
 }