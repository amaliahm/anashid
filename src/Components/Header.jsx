const Header = ({title, gradient = false}) => {
    return (
        <p className={`capitalize font-medium ${ gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--mainColor)] to-[rgba(243, 139, 220, 0)]' : 'text-[var(--mainColor)]'} text-3xl lg:text-7xl lg:w-3/4 md:text-5xl md:w-3/4 text-wrap`}>
          {title}
        </p>
    )
}

export default Header