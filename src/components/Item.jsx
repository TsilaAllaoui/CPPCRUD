import "../css/Item.scss"

function Item(props)
{
    return <div className="item">
        <p>{props.id}</p>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>{props.desc}</p>
    </div>;
}

export default Item;