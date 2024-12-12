const LockIcon = ({ color = 'currentColor', width = 20, height = 22 }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 20 22" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M4 6V9H2C0.89543 9 0 9.89543 0 11V20C0 21.1046 0.895431 22 2 22H18C19.1046 22 20 21.1046 20 20V11C20 9.89543 19.1046 9 18 9H16V6C16 2.68629 13.3137 0 10 0C6.68632 0 4 2.68629 4 6ZM10 2C7.79088 2 6 3.79086 6 6V9H14V6C14 3.79086 12.2091 2 10 2ZM11 14C11 13.4477 10.5523 13 10 13C9.44771 13 9 13.4477 9 14V17C9 17.5523 9.44771 18 10 18C10.5523 18 11 17.5523 11 17V14Z" 
      fill={color} 
    />
  </svg>
);

export default LockIcon;
