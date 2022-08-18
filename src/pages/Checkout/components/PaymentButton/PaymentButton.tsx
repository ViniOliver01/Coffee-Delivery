import { CreditCard } from "phosphor-react";

export function PaymentButton(){
  return (
    <div>
      <CreditCard id="creditcard" size={16} className="purple" />
      <p id="creditcard">Cartão de crédito</p>

      <input type="checkbox" className="toggle-switch-checkbox" name="toggleSwitch" id="toggleSwitch" />
              <label className="toggle-switch-label">
                Toggle Me!
              </label>
    </div>
  );
}