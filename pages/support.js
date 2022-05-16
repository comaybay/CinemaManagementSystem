import Link from "next/link";
import { useState } from "react"
import supabase from "../utils/supabase";

export default function Support() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSent, setHasSent] = useState(false);

  const sendMessage = async () => {
    if (content.trim().length === 0 ) {
      setErrorMsg("*Nội dung góp ý không được để trống.");
      return;
    }

    await supabase.from("customer_messages").insert({ 
      name: name.trim.length > 0 ? name.trim() : "anonymous",
      email: email.trim(), 
      phone: phone.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0]
     });

     setHasSent(true);
  }

  return (
    <div className="content">
      <div className="navMovie">
        <ul>
          <li className="text-3xl mb-4 text-blue-700">Góp ý</li>
        </ul>
      </div>
      <div className="supportForm">
        <div className="titleForm">
          <div className="feedback-title">
            <h2>Bạn có gì muốn nhắn nhủ CinemaS ?</h2>

            <div className="feedback-contact">
              <div className="feedback-contact-item inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                <a href="mailto:support@CinemaS.com.vn" className="text-2xl">support@CinemaS.com.vn</a>
              </div>
              <div className="feedback-contact-item inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
                <a href="tel:19000001" className="text-2xl">19000001</a>
              </div>
            </div>
          </div>
        </div>
        {
          hasSent ? (
            <div className="contentForm flex flex-col items-center">
              <p className="text-5xl text-green-600 mb-6">Đã gửi thành công!</p>
              <Link href="/">
                <button className="text-3xl px-6 py-3 rounded-md bg-blue-700 text-white hover:bg-blue-800">
                  Quay lại trang chủ
                </button>
              </Link>
            </div>
          ) :
          (
            <div className="contentForm">
              <div className="col-md-4 col-sm-4 col-xs-12">
                <input onChange={e => setName(e.target.value)} value={name} id="name" placeholder="Họ và Tên" type="text" required="" ng-model="data.name" className="text-2xl login ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched" />
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <input onChange={e => setEmail(e.target.value)} value={email} id="email" placeholder="Email" type="email" required="" ng-model="data.email" className="text-2xl login ng-pristine ng-empty ng-valid-email ng-invalid ng-invalid-required ng-touched" />
              </div>
              <div className="col-md- col-sm-4 col-xs-12">
                <input onChange={e => setPhone(e.target.value)} value={phone} id="phone" placeholder="Số điện thoại" type="number" ng-model="data.phone" className="text-2xl login ng-pristine ng-valid ng-empty ng-touched" />
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12">
                <textarea onChange={e => setContent(e.target.value)} value={content} rows="10" placeholder="Nội dung" required="" ng-model="data.message" className="text-2xl p-3 w-full h-72 support-form ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"></textarea>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 flex justify-between">
                <p className="text-xl text-red-700">{errorMsg}</p>
                <button onClick={sendMessage} href="#" className="btn primary-arrow btn-sent-support pull-right bg-blue-700 hover:bg-blue-800">Gửi</button>
              </div>
            </div>
          )
        }
      
      </div>
    </div>
  )
}