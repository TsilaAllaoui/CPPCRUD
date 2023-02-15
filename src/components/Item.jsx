import "../css/Item.scss"

function Item(props)
{
    return <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>{props.desc}</td>
    </tr>;
}

export default Item;