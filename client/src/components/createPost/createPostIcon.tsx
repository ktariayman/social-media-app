type Props = {
  children: React.ReactNode,
  onClick?: () => void
}
export const CreatePostIcon = ({ children, onClick }: Props) => (
  <div className='createPost_icon hover1' onClick={onClick}>
    {children}
  </div>
);  