type Props = {
  className?: string;
  onClick: () => void;
}

export const CloseButton = (props: Props) => {
  const {className, onClick, ...rest} = props;

  return (
    <button className={`relative w-[48px] h-[48px] flex items-center justify-center bg-[#EA5616] rounded-[10px] border-[1px] border-[#000000] cursor-pointer ${className ?? ''}`} onClick={onClick} {...rest}>
      <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.8711 4.46875L18.9385 14.4014L28.8691 24.332L24.3994 28.8008L14.4355 18.8369L4.47168 28.8008L0.00195312 24.332L9.93262 14.4014L0 4.46875L4.46875 0L14.4355 9.96289L24.4023 0L28.8711 4.46875Z" fill="white"/>
      </svg>
    </button>
  );
};