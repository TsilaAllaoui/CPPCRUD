import Item from "./Item";
import "../css/View.scss"

function View(props) {
    return <div className="view">
        <table>
            <thead>
                <td>Id</td>
                <td>Name</td>
                <td>Price</td>
                <td>Description</td>
            </thead>
            <tbody>
                {props.datas.map((data, index) => {
                    return <Item key={index} {...data} />
                })}
            </tbody>

        </table>
    </div>;
}

export default View;