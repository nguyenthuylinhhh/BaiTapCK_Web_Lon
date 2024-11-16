function dangKy() {
    location.replace("../html/dangKy.html");
}

function kiemTraHoTen(){
    let hoTen = document.getElementById('txtHoten').value;
    let regexHoten = /^([A-Z][a-z]+\s*)+$/;
    if(hoTen.trim() == ""){
        document.getElementById('errorNameDK').innerHTML = 'Vui lòng nhập họ tên';
        return false;
    }
    if(!regexHoten.test(hoTen)){
        document.getElementById('errorNameDK').innerHTML = 'Họ tên không hợp lệ';
        return false;
    }
    document.getElementById('errorNameDK').innerHTML = '';
    return true;
}
function kiemTraTKDK() {
    let taiKhoan = document.getElementById('txtTKDK').value;
    let regexTKDK = /^[0-9a-z]+$/;
    
    if(taiKhoan.trim() == ""){
        document.getElementById('errorTKDK').innerHTML = 'Vui lòng nhập tài khoản';
        return false;
    }
    if(!regexTKDK.test(taiKhoan)) {
        document.getElementById('errorTKDK').innerHTML = 'Tài khoản không được chứa ký tự in hoa và ký tự đặc biệt';
        return false;
    }
    document.getElementById('errorTKDK').innerHTML = '';
    return true;
}
function kiemTraMKDK() {
    let passDK = document.getElementById('txtMKDK').value;
    let regetMKDK = /^[0-9a-zA-Z]{6,}$/;
    if(passDK.trim() == ""){
        document.getElementById('errorPassDK').innerHTML = 'Vui lòng nhập mật khẩu';
        return false;
    }
    if(!regetMKDK.test(passDK)) {
        document.getElementById('errorPassDK').innerHTML = 'Mật khẩu phải có tối thiểu 6 ký tự trừ kí tự đặc biệt';
        return false;
    }
    document.getElementById('errorPassDK').innerHTML = '';
    return true;
}
function kiemTraRePassDK() {
    let passDK = document.getElementById('txtMKDK').value;
    let repass = document.getElementById('txtRepassDK').value;
    if(repass.trim() == "") {
        document.getElementById('errorRePassDK').innerHTML = 'Vui lòng nhập lại mật khẩu';
        return false;
    }
    if(repass != passDK) {
        document.getElementById('errorRePassDK').innerHTML = 'Mật khẩu nhập lại phải khớp với mật khẩu ban đầu';
        return false;
    }
    document.getElementById('errorRePassDK').innerHTML = '';
    return true;
}

function taoTaiKhoan() {
    if(!kiemTraHoTen() || !kiemTraTKDK() || !kiemTraMKDK() || !kiemTraRePassDK() || !kiemTraSDT()){
        return false;
    }
    let lstTK = localStorage.getItem('dstk') ? JSON.parse(localStorage.getItem('dstk')):[];
    let hoTen = document.getElementById('txtHoten').value;
    let taiKhoan = document.getElementById('txtTKDK').value;
    let passDK = document.getElementById('txtMKDK').value;
    let sdt = document.getElementById('phone').value;
    tkkh = [hoTen, taiKhoan, passDK, sdt];
    for(let i = 0; i < lstTK.length; i++){
        if(lstTK[i][1] == taiKhoan){
            document.getElementById('errorTKDK').innerHTML = 'Tài khoản đã tồn tại';
            return false;
        }
    }
    lstTK.push(tkkh);
    localStorage.setItem('dstk', JSON.stringify(lstTK));
    let modal = `<div id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thông báo</h5>
            </div>
            <div class="modal-body">
                <p>Bạn đã đăng ký thành công</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick = "sangTrangChu()">OK</button>
            </div>
        </div>
    </div>
    </div>`;
    document.getElementById('createModal').innerHTML = modal;
    return true;
}

function kiemTraTK() {
    let tk = document.getElementById('txtTK').value;
    if(tk.trim() == ""){
        document.getElementById('errorTK').innerHTML = 'Vui lòng nhập tài khoản';
        return false;
    }
   
    document.getElementById('errorTK').innerHTML = '';
    return true;
}

function kiemTraMK() {
    let mk = document.getElementById('txtPass').value;
    if(mk.trim() == "") {
        document.getElementById('errorPass').innerHTML = 'Vui lòng nhập mật khẩu';
        return false;
    }
    document.getElementById('errorPass').innerHTML = '';
    return true;
}

function kiemTraDangNhap() {
    let lstTK = localStorage.getItem('dstk') ? JSON.parse(localStorage.getItem('dstk')):[];
    let tk = document.getElementById('txtTK').value;
    let mk = document.getElementById('txtPass').value;
    if(!kiemTraTK() || !kiemTraMK()) {
        return false;
    }
    let flag = 0;
    for(let i = 0; i < lstTK.length; i++) {
        if(lstTK[i][1] == tk){
            if(lstTK[i][2] == mk){
                flag = 1;
                break;
            }
            flag = -1;
        }
    }
    if(flag == 0) {
        document.getElementById('errorTK').innerHTML = 'Không tìm thấy tài khoản';
        return false;
    }
    if(flag == -1) {
        document.getElementById('errorPass').innerHTML = 'Sai mật khẩu';
        return false;
    }
    let arrDN = [tk, mk];
    sessionStorage.setItem('ttDN', JSON.stringify(arrDN));
    return true;
}

function dangNhap() {
    if(kiemTraDangNhap()){
        history.back();
    }
}

function isDangNhap() {
    let arrDN = sessionStorage.getItem('ttDN');
    if(arrDN == null){
        return false;
    }
    return true;
}

function dangXuat() {
    sessionStorage.clear();
    location.replace("../html/dangNhap.html");
}

function loadThongTinDangNhap() {
    if(isDangNhap()){
        let arrDN = JSON.parse(sessionStorage.getItem('ttDN'));
        let taga = `<a href="../html/thongTinKH.html" id="linkDangNhap" data-toggle="tooltip" title="Thông tin tài khoản">
        <span><i class="bi bi-person text-dark"></i></span>
    </a>` + '<span>'+arrDN[0]+'</span>';
        let tagsp = '<button class= "myButton" type="button" onclick= "dangXuat()">Đăng xuất</button>';
        document.getElementById('linkDangNhap').style.display = "none";
        document.getElementById('linkDangKy').style.display = "none";
        document.getElementById('dangNhap').innerHTML = taga;
        document.getElementById('dangKy').innerHTML = tagsp;
        document.getElementById('dangKy').style.marginTop = "30px";
    }
}

function loadThongTinKH() {
    let arrDN = JSON.parse(sessionStorage.getItem('ttDN'));
    let lstTK = JSON.parse(localStorage.getItem('dstk'));
    for(let i = 0; i < lstTK.length; i++){
        if(arrDN[0] == lstTK[i][1]){
            document.getElementById('txtHoten').innerHTML = lstTK[0][0];
            document.getElementById('txtTK').innerHTML = lstTK[0][1];
            document.getElementById('txtSDT').innerHTML = lstTK[0][3];
            break;
        }
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function thanhToan() {
    if(!isDangNhap()){
        window.location = "../html/dangNhap.html"
        // alert('Bạn phải đăng nhập để thanh toán');
        return false;
    }
    location.replace("../html/datHang.html");
}

function sangTrangChu() {
    window.location = "../html/home.html";
}