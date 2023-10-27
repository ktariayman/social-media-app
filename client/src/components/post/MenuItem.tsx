export default function MenuItem({ icon, title, subtitle, img }: any) {
  return (
    <li className="hover1" style={{ display: 'flex', gap: '20px' }}>
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="menu_post_col">{subtitle}</span>}
      </div>
    </li>
  );
}
