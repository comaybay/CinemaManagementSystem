import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import supabase from "../utils/supabase.js"
import useUserProfile from "../utils/useUserProfile.js";

export default function SignIn() {
  const router = useRouter();
  const {user} = useUserProfile();
  if (user) {
    router.replace("/")
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (!(email && password)) {
      setErrorMsg(`Chưa điền ${email ? "" : ", email"}${password ? "" : ", mật khẩu"}`.replace(", ", ""))
      return;
    }

    setLoading(true);

    let { user, error } = await supabase.auth.signIn({
      email,
      password
    });

    if (error) {
      setErrorMsg(error.message)
    }
    else {
      router.back();
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
            <ul className="nav nav-tabs"><li className="active"><a id="a_tab_login_1" href="#tab_login_1" data-toggle="tab" aria-expanded="true">Đăng nhập</a></li><li><a className="line">/</a></li><li className=""><Link href="sign-up">Đăng ký</Link></li>
            </ul>
            <div className="row">
              <div className="col-md-12">
                <div className="tab-content">
                  <div className="tab-pane active">
                    <div className="login-tab-wrapper">
                      <form ng-submit="submit()" className="login-form ng-pristine ng-valid-email ng-invalid ng-invalid-required">
                        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required="required" className="login ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required" />
                        <input placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} type="password" required="required" className="login ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required" />
                        <p className="text-red-700 text-lg mb-2">{errorMsg}</p>
                        {
                          loading ?
                            <button disabled="true" className="btn primary input"><i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Đang kiểm tra...</button>
                            :
                            <button onClick={signIn} className="btn primary input"><i ng-show="isSubmit" className="fa fa-pulse fa-spinner ng-hide"></i>Đăng nhập</button>

                        }
                      </form>
                    </div>
                  </div>
                </div></div></div></div></div></div>
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
