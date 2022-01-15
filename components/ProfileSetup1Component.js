
export default ({ title, callback }) => {
    return (
        <div className = 'bg3 text-center mx-2 justify-content-center' style = {{ display: 'flex', flexDirection: 'column', minWidth: 120, minHeight: 150, borderRadius: 20, boxShadow: '1px 2px 3px black' }}
        onClick = {callback}>
            {title}
        </div>
    )
}
