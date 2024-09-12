const Header = ({title, gradient = false}) => {
    return (
        <p className={`capitalize font-medium ${ gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--mainColor)] to-[rgba(243, 139, 220, 0.9)] lg:w-4/6 md:w-4/6 ' : 'text-[var(--mainColor)]'} text-2xl lg:text-6xl md:text-5xl text-wrap`}>
          {title}
        </p>
    )
}

export default Header