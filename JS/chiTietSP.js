function thongTinSP(x) {
    let parent1 = x.parentElement.children;
    let parent2 = x.parentElement.parentElement.children;
    let hinh = parent2[0].children[0].src;
    let ten = parent1[0].innerText;
    let gia = parent1[1].children[0].innerText;
    let arrSP = [hinh, ten, gia];
    sessionStorage.setItem('sp', JSON.stringify(arrSP));
    window.location = "../html/chiTietSanPham.html";
}
function loadChiTietSP() {
    let sp = JSON.parse(sessionStorage.getItem('sp'));
    let hinh = '<img src="'+sp[0]+'" alt="" width="70%">';
    document.getElementById('hinhAnh').innerHTML = hinh;
    document.getElementById('ten').innerHTML = sp[1];
    document.getElementById('gia').innerHTML = sp[2];
}
function giam() {
    let soLuong = Number(document.getElementById('txtSL').value);
    if(soLuong > 1) {
        soLuong--;
        document.getElementById('txtSL').value = soLuong;
    }
    
}
function tang() {
    let soLuong = Number(document.getElementById('txtSL').value);
    soLuong++;
    document.getElementById('txtSL').value = soLuong;
}

function addSPVaoCart() {
    let sp = JSON.parse(sessionStorage.getItem('sp'));
    let size = document.getElementById('select').value;
    let gioHang = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    let ktra = false;
    
    let soLuong = Number(document.getElementById('txtSL').value);
    let total = soLuong*Number(sp[2]);
    let arrSP = [sp[1], sp[0], sp[2], size, soLuong, total];
    for(let i = 0; i < gioHang.length; i++) {
        if(sp[1] == gioHang[i][0]){
            gioHang[i][4]+= soLuong;
            gioHang[i][5]+=total;
            ktra = true;
        }
    }
    if(!ktra){
        gioHang.push(arrSP);
    }
    localStorage.setItem('cart', JSON.stringify(gioHang));
}

function loadCart() {
    let gioHang = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    if(gioHang.length != 0){
        document.getElementById('cartEmpty').style.display = "none";
        let total = 0;
        let row = "";
        for(let i = 0; i < gioHang.length; i++) {
            row += '<tr>'+'<td>'+gioHang[i][0]+'</td><td><img src="'+gioHang[i][1]+'" alt="" width="100px"></td><td>'+gioHang[i][2]+'đ</td><td>'+gioHang[i][3]+'</td><td>'+gioHang[i][4]+'</td><td>'+gioHang[i][5]+'đ</td></td><td><button type="button" class="btn btn-danger" onclick="xoaSP(this)">Xóa</button></td></tr>';
            total+= gioHang[i][5];
        }
        document.getElementById('tbcart').innerHTML = row;
        document.getElementById('tongTien').innerHTML = 'Tổng tiền phải thanh toán: '+total+'đ';
        return true;
    }
    document.getElementById('cart').style.display = "none";
 
}
function xoaSP(x) {
    let tr = x.parentElement.parentElement;
    let tenSP = tr.children[0].innerText;
    tr.remove();
    let gioHang = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    for(let i = 0; i < gioHang.length; i++) {
        if(gioHang[i][0] == tenSP){
            gioHang.splice(i, 1);
            break;
        }
    }
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(gioHang));
    loadCart();
    if(gioHang.length == 0){
        location.replace("../html/gioHang.html")
    }
}

function backPage(){
    history.back();
}
function goCart(){
    window.location = "../html/gioHang.html";
}
function loadThongTinCart() {
    let gioHang = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    let total = 0;
    let row = "";
    for(let i = 0; i < gioHang.length; i++) {
        row += '<tr>' +
        '<td>'+gioHang[i][0]+'</td>'+
        '<td>'+gioHang[i][4]+'</td>'+
        '<td>'+gioHang[i][5]+'</td>'+
    '</tr>';
        total+= gioHang[i][5];
    }
    document.getElementById('tblDatHang').innerHTML = row;
    document.getElementById('total').innerHTML = total;
}

function kiemTraHoTenTT() {
    let hoten = document.getElementById('txtHoten').value;
    let regexHoten = /^([A-Z][a-z]+\s*)+$/;
    if(hoten.trim() == ""){
        document.getElementById('warningHoten').innerHTML = 'Vui lòng nhập họ tên';
        return false;
    }
    if(!regexHoten.test(hoten)) {
        document.getElementById('warningHoten').innerHTML = 'Họ tên không hợp lệ';
        return false;
    }
    document.getElementById('warningHoten').innerHTML = '';
    return true;
} 
function kiemTraSDT() {
    let sdt = document.getElementById('txtSDT').value;
    let regetSDT = /^0[0-9]{9}$/;
    if(sdt.trim() == ""){
        document.getElementById('warningSDT').innerHTML = 'Vui lòng nhập số điện thoại';
        return false;
    }
    if(!regetSDT.test(sdt)) {
        document.getElementById('warningSDT').innerHTML = 'Số điện thoại phải bắt đầu bằng 0 và chứa 10 ký tự số';
        return false;
    }
    document.getElementById('warningSDT').innerHTML = '';
    return true;
}
function kiemTraDiaChi() {
    let diaChi = document.getElementById('txtDiaChi').value;
    if(diaChi.trim() == ""){
        document.getElementById('warningDiaChi').innerHTML = 'Vui lòng nhập địa chỉ';
        return false;
    }
    document.getElementById('warningDiaChi').innerHTML = '';
    return true;
}
function thanhToan() {
    if(!kiemTraHoTenTT() || !kiemTraSDT() || !kiemTraDiaChi()){
        return false;
    }
    alert('Đặt hàng thành công');
    localStorage.removeItem('cart');
    window.location = "../html/home.html";
}