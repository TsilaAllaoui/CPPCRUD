import Item from "./Item";

function View(props)
{
    return <div>
        { props.datas.map((data, index) => {
            return <Item key={index}{...data}/>
        })}
    </div>;
}

export default View;