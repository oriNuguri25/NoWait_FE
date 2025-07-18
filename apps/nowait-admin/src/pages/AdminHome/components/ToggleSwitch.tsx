interface ToggleSwitchProps {
  isOn: boolean;
  toggle: () => void;
}

const ToggleSwitch = ({ isOn, toggle }: ToggleSwitchProps) => {
  return (
    <div data-cy="setting_toggle" className="toggle-btn">
      <label className="switch">
        <input type="checkbox" checked={isOn} onChange={toggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
