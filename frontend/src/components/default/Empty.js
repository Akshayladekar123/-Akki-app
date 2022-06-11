import iconGray from './../../assets/img/icon-gray.svg';

const Empty = (props) => {
    return (
        <div className="nouser-container">
            <img width="72" src={props.icon ?? iconGray} alt="icon" />
            <p>{props.message ?? 'Empty'}</p>
        </div>
    );
}

export default Empty;