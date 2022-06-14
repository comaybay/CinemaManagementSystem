import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import supabase from "../utils/supabase.js"
import useUserProfile from "../utils/useUserProfile.js";

export default function SignUp() {
  const router = useRouter();
  const { user } = useUserProfile();
  if (user) {
    router.replace("/")
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!(name && email && phoneNumber && password && rePassword && dateOfBirth)) {
      setErrorMsg(`Chưa điền ${name ? "" : ", tên"}${email ? "" : ", email"}${password ? "" : ", mật khẩu"}${dateOfBirth ? "" : ", ngày sinh"}${rePassword ? "" : ", chưa nhập lại mật khẩu"}`.replace(", ", ""))
      return;
    }

    if (password != rePassword) {
      setErrorMsg("Mật khẩu nhập lại không khớp với mật khẩu")
      return;
    }

    const dateArr = dateOfBirth.split("/");
    if (dateArr.length < 3) {
      setErrorMsg("Ngày sinh không hợp lệ")
      return;
    }

    setLoading(true);
    let { user, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setErrorMsg(error.message)
    }

    else {
      const { error } = await supabase.from("profiles").insert([{
        id: user.id,
        name,
        date_of_birth: `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`,
        phone_number: phoneNumber
      }]);

      if (error) {
        setErrorMsg(error.message)
      }
      else {
        router.replace('/');
      }
    
    }

    setLoading(false);
  }

  return (
    <div id="main" className="">
      <div className="login-wrapper my-10">
        <div className="login-container  w-[500px] mx-auto">
          <span ng-click="closeModel()" className="close">
            <i className="icon-cancel"></i>
          </span>
          <div className="tab-login-line">
            <ul className="nav nav-tabs"><li><Link href="/sign-in">Đăng nhập</Link></li><li><a className="line">/</a></li><li className="active"><a id="a_tab_login_2" href="#tab_login_2" data-toggle="tab" aria-expanded="false">Đăng ký</a></li>
            </ul>
            <div className="row">
              <div className="col-md-12">
                <div className="tab-content">
                  <div id="tab_login_1" className="tab-pane active">
                    <div className="login-tab-wrapper">
                      <div className="login-heading">
                        <div className="text-heading"><span ng-if="!enableSkip" className="sub-text ng-scope">Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm nhiều ưu đãi từ chương trình thành viên Galaxy Cinema.</span></div></div>
                      <form ng-submit="submit()" className="login-form ng-pristine ng-valid-email ng-invalid ng-invalid-required">
                        <input placeholder="Email" type="email" ng-model="userInfo.email" required="required" className="login ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required" />
                        <input maxLength="256" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} type="password" required="required" className="login ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                        <div className="login-remember"><div className="forget-pass"><a id="forgetPass" href="" ng-click="openForgetPass()">Quên mật khẩu?</a></div></div>
                        <button className="btn primary input">
                          <i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Đăng nhập
                        </button>
                      </form>
                    </div>
                  </div>
                  <div id="tab_login_2" ng-controller="registerController" className="tab-pane ng-scope">
                    <div className="login-tab-wrapper">
                      <div className="login-form">
                        <form ng-submit="submit()" className="ng-pristine ng-invalid ng-invalid-required ng-valid-maxlength ng-valid-email">
                          <input maxLength="256" placeholder="Họ tên" type="text" value={name} onChange={e => setName(e.target.value)} required="required" className="login first ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                          <div className="flex">
                            <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} maxLength="14" ng-model="user.mobilePhone" required="required" className="login register-input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-maxlength" /></div>
                          <input maxLength="256" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required="required" className="login register-input remove-mb ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required" />
                          <div className="row city">
                            <div maxLength="256" className="col-md-6 col-sm-6 col-xs-6 first-col"><input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required="required" className="login ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" /></div>
                            <div maxLength="256" className="col-md-6 col-sm-6 col-xs-6 second-col"><input type="password" placeholder="Xác nhận mật khẩu" value={rePassword} onChange={e => setRePassword(e.target.value)} required="required" className="login ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                            </div>
                          </div>
                          <div className="row birthday-signup">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <input type="text" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="login register-input btn-select-input" placeholder="Ngày sinh (dd/mm/yyyy)" />
                            </div>
                          </div>
                          <p className="text-red-700 text-lg mb-2">{errorMsg}</p>
                          {
                            loading ?
                              <button disabled={loading} className="btn primary input"><i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Đang kiểm tra...</button>
                              :
                              <button onClick={signUp} className="btn primary input"><i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Đăng ký</button>

                          }
                        </form>
                      </div>
                    </div></div></div></div></div></div></div></div>
      <div ng-controller="forgetPassController" className="ng-scope">
        <div id="forgetpass-modal" style={{ zIndex: 1111, display: "none" }} className="modal fade">
          <div className="modal-dialog"><div className="modal-outer-container">
            <div className="modal-middle-container"><div className="login-wrapper animated slideInDown">
              <div className="login-container"><span ng-click="closeModelForget()" className="close">
                <i className="icon-cancel"></i></span><div className="tab-login-line">
                  <div className="tab-login-title">Quên mật khẩu</div>
                  <div className="login-tab-wrapper">
                    <div className="login-heading"><div className="text-heading">
                      <span className="sub-text">Vui lòng cung cấp email đăng nhập, chúng tôi sẽ gửi link kích hoạt cho bạn.</span>
                    </div>
                    </div>
                    <form ng-submit="submit()" className="login-form ng-pristine ng-valid-email ng-invalid ng-invalid-required">
                      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required="required" className="login ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required" />
                      <button className="btn primary input">
                        <i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Cấp lại mật khẩu
                      </button>
                    </form>
                  </div>
                </div></div></div></div></div></div></div></div>
      <div ng-controller="registerController" className="ng-scope">
        <div id="success-modal" style={{ zIndex: 1111 }} className="modal fade">
          <div className="modal-dialog"><div className="modal-outer-container">
            <div className="modal-middle-container">
              <div className="login-wrapper animated slideInDown">
                <div className="login-container">
                  <span ng-click="closeModelSuccess()" className="close">
                    <i className="icon-cancel"></i></span>
                  <div className="tab-login-line">
                    <div className="tab-login-title">Đăng ký thành công</div>
                    <div className="login-tab-wrapper"><div className="login-heading success">
                      <i className="icon-success"></i><div className="text-heading">
                        <span className="sub-text">Bạn vui lòng truy cập email để kích hoạt tài khoản.

                        </span>
                      </div></div></div></div></div></div></div></div></div></div></div></div>
  )
}
