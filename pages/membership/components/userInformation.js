import { useEffect, useState } from "react";
import supabase from "../../../utils/supabase";
import useUserProfile from "../../../utils/useUserProfile"
import Button from "../../components/Button"

export default function UserInformation() {
  const {isProfileLoading, profile, user} = useUserProfile();
  
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isProfileLoading) {
      setName(profile.name);
      setDob(new Date(profile.date_of_birth).toISOString().split('T')[0]);
      setPhoneNumber(profile.phone_number); 
      setSex(profile.sex);
      setAddress(profile.address);
      setProvince(profile.province); 
      setEmail(user.email);
    }
  }, [isProfileLoading]);

  const save = async () => {
    setSuccessMsg("");
    setLoading(true);
    const p1 = supabase.from("profiles").update({
      name,
      date_of_birth: dob,
      phone_number: phoneNumber,
      sex,
      address,
      province,
    }).match({id: user.id});

    const p2 = supabase.auth.update({ email })
    await p1;
    await p2;
    setLoading(false);
    setSuccessMsg("Cập nhật thông tin thành công!");
  } 

  const changePassword = async () => {
    setSuccessMsg("");
    setLoading(true);

    if (newPassword !== renewPassword) {
      setErrorMsg("Xác nhận lại mật khẩu không đúng");
      setLoading(false);
      return;
    }

    const {error}= await supabase.rpc("change_user_password", { current_plain_password: password, new_plain_password : newPassword})
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    
    setLoading(false);
    setErrorMsg("");
    setSuccessMsg("Đổi mật khẩu thành công!");
  }

  return (
    <div className="text-2xl my-10">
      {!isProfileLoading && (
      <div id="tab_info" ng-controller="userInfoController" className="tab-pane active ng-scope">
          <div className="row">
            <div className="col-md-5 col-sm-7 col-xs-7">
              <label>Họ &amp; Tên</label>
              <input maxLength="256" className="login" value={name} onChange={e => setName(e.target.value)} />
            </div>

          </div>
          <div className="row row-info">
            <div className="col-md-3 col-sm-8 col-xs-8">
              <label>Ngày sinh</label>
                <input className="login" type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </div>
            <div className="col-md-2 col-sm-4 col-xs-4">
              <label>Giới tính</label>
              <input maxLength="256" className="login" value={sex} onChange={e => setSex(e.target.value)} />
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <label>Số điện thoại</label>
              <input maxLength="14" className="login" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
          </div>
          <div className="row row-info">
            <div className="col-md-5">
              <label>Địa chỉ</label>
              <input maxLength="256" className="login" value={address} onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6">
              <label>Tỉnh/Thành Phố</label>
                <select value={province} onChange={e => setProvince(e.target.value)} className="login">
                  <option></option>
                  <option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="0" className="ng-binding ng-scope" value="number:0">
                    TP Hồ Chí Minh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="1" className="ng-binding ng-scope" value="number:1">
                    Hà Nội
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="2" className="ng-binding ng-scope" value="number:2">
                    Đà Nẵng
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="3" className="ng-binding ng-scope" value="number:3">
                    An Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="4" className="ng-binding ng-scope" value="number:4">
                    Bà Rịa - Vũng Tàu
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="5" className="ng-binding ng-scope" value="number:5">
                    Bắc Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="6" className="ng-binding ng-scope" value="number:6">
                    Bắc Kạn
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="7" className="ng-binding ng-scope" value="number:7">
                    Bạc Liêu
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="8" className="ng-binding ng-scope" value="number:8">
                    Bắc Ninh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="9" className="ng-binding ng-scope" value="number:9">
                    Bến Tre
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="10" className="ng-binding ng-scope" value="number:10">
                    Bình Dương
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="11" className="ng-binding ng-scope" value="number:11">
                    Bình Định
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="12" className="ng-binding ng-scope" value="number:12">
                    Bình Phước
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="13" className="ng-binding ng-scope" value="number:13">
                    Bình Thuận
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="14" className="ng-binding ng-scope" value="number:14">
                    Cà Mau
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="15" className="ng-binding ng-scope" value="number:15">
                    Cần Thơ
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="16" className="ng-binding ng-scope" value="number:16">
                    Cao Bằng
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="17" className="ng-binding ng-scope" value="number:17">
                    Đắk Lắk
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="18" className="ng-binding ng-scope" value="number:18">
                    Đắk Nông
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="19" className="ng-binding ng-scope" value="number:19">
                    Điện Biên
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="20" className="ng-binding ng-scope" value="number:20">
                    Đồng Nai
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="21" className="ng-binding ng-scope" value="number:21">
                    Đồng Tháp
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="22" className="ng-binding ng-scope" value="number:22">
                    Gia Lai
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="23" className="ng-binding ng-scope" value="number:23">
                    Hà Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="24" className="ng-binding ng-scope" value="number:24">
                    Hà Nam
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="25" className="ng-binding ng-scope" value="number:25">
                    Hà Tĩnh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="26" className="ng-binding ng-scope" value="number:26">
                    Hải Dương
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="27" className="ng-binding ng-scope" value="number:27">
                    Hải Phòng
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="28" className="ng-binding ng-scope" value="number:28">
                    Hậu Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="29" className="ng-binding ng-scope" value="number:29">
                    Hòa Bình
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="30" className="ng-binding ng-scope" value="number:30">
                    Hưng Yên
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="31" className="ng-binding ng-scope" value="number:31">
                    Khánh Hòa
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="32" className="ng-binding ng-scope" value="number:32">
                    Kiên Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="33" className="ng-binding ng-scope" value="number:33">
                    Kon Tum
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="34" className="ng-binding ng-scope" value="number:34">
                    Lai Châu
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="35" className="ng-binding ng-scope" value="number:35">
                    Lâm Đồng
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="36" className="ng-binding ng-scope" value="number:36">
                    Lạng Sơn
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="37" className="ng-binding ng-scope" value="number:37">
                    Lào Cai
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="38" className="ng-binding ng-scope" value="number:38">
                    Long An
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="39" className="ng-binding ng-scope" value="number:39">
                    Nam Định
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="40" className="ng-binding ng-scope" value="number:40">
                    Nghệ An
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="41" className="ng-binding ng-scope" value="number:41">
                    Ninh Bình
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="42" className="ng-binding ng-scope" value="number:42">
                    Ninh Thuận
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="43" className="ng-binding ng-scope" value="number:43">
                    Phú Thọ
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="44" className="ng-binding ng-scope" value="number:44">
                    Phú Yên
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="45" className="ng-binding ng-scope" value="number:45">
                    Quảng Bình
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="46" className="ng-binding ng-scope" value="number:46">
                    Quảng Nam
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="47" className="ng-binding ng-scope" value="number:47">
                    Quảng Ngãi
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="48" className="ng-binding ng-scope" value="number:48">
                    Quảng Ninh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="49" className="ng-binding ng-scope" value="number:49">
                    Quảng Trị
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="50" className="ng-binding ng-scope" value="number:50">
                    Sóc Trăng
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="51" className="ng-binding ng-scope" value="number:51">
                    Sơn La
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="52" className="ng-binding ng-scope" value="number:52">
                    Tây Ninh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="53" className="ng-binding ng-scope" value="number:53">
                    Thái Bình
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="54" className="ng-binding ng-scope" value="number:54">
                    Thái Nguyên
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="55" className="ng-binding ng-scope" value="number:55">
                    Thanh Hóa
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="56" className="ng-binding ng-scope" value="number:56">
                    Thừa Thiên Huế
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="57" className="ng-binding ng-scope" value="number:57">
                    Tiền Giang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="58" className="ng-binding ng-scope" value="number:58">
                    Trà Vinh
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="59" className="ng-binding ng-scope" value="number:59">
                    Tuyên Quang
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="60" className="ng-binding ng-scope" value="number:60">
                    Vĩnh Long
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="61" className="ng-binding ng-scope" value="number:61">
                    Vĩnh Phúc
                  </option><option ng-repeat="item in items" ng-selected="item[model.keyValue] == model.currentValue" ng-value="62" className="ng-binding ng-scope" value="number:62">
                    Yên Bái
                  </option>
                </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
                <label>Email</label>
              <input maxLength="256" className="login" value={email} onChange={e => setEmail(e.target.value)} />
              <input />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Button disabled={loading} onClick={save}>
                Lưu lại
              </Button>
            </div>
          </div>

          {successMsg && (<p className="mt-10 inline-block border-2 border-green-600 border-dashed py-2 px-48 mb-10 font-semibold text-3xl text-green-600">{successMsg}</p>)}

          <div className="row mt-10">
            <div className="col-md-12">
              <div className="toggle-button toggle-button-login toggle-member">
                <input id="changepass" type="checkbox" ng-model="user.changePassword" className="ng-pristine ng-untouched ng-valid ng-empty"/>
                  <label>Đổi mật khẩu</label>
                  <div className="toggle-button-icon">
                  </div>
              </div>
              <div id="box-changepass">
                <input maxLength="256" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu hiện tại" type="password" ng-model="user.oldPassword" className="login ng-pristine ng-untouched ng-valid ng-empty"/>
                <input maxLength="256" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" type="password" ng-model="user.newPassword" className="login ng-pristine ng-untouched ng-valid ng-empty"/>
                <input maxLength="256" value={renewPassword} onChange={e => setRenewPassword(e.target.value)} placeholder="Xác nhận mật khẩu" type="password" ng-model="user.confirmNewPassword" className="login ng-pristine ng-untouched ng-valid ng-empty"/>
                    </div>
                  </div>
              </div>

            <div className="row row-info mt-4">
              <div className="col-md-12">
                <Button disabled={loading} onClick={changePassword}>
                  Đổi mật khẩu
                </Button>
                <p className="text-red-700">{errorMsg}</p>
              </div>
            </div>
      </div>
      )}
    </div>
  )
}