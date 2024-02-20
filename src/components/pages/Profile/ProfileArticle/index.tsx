// import {NavLink} from "react-router-dom";
//
// const ProfileArticle = (props: {
//
// }) => {
//     return(
//         <div className="article-preview">
//             <div className="article-meta">
//                 <a href="/profile/eric-simons"><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
//                 <div className="info">
//                     <a href="/profile/eric-simons" className="author">{props.author}</a>
//                     <span className="date">{props.date}</span>
//                 </div>
//                 <button className="btn btn-outline-primary btn-sm pull-xs-right">
//                     <i className="ion-heart"></i> {props.likes}
//                 </button>
//             </div>
//             <a href="/article/how-to-buil-webapps-that-scale" className="preview-link">
//                 <h1>{props.title}</h1>
//                 <p>{props.description}</p>
//                 <NavLink to={`/article/${props.slug}`}>
//                     <span>Read more...</span>
//                 </NavLink>
//                 <ul className="tag-list">
//                     {props.tagList.map(tag => {
//                         return (
//                             <li className="tag-default tag-pill tag-outline">{tag}</li>
//                         );
//                     })}
//                 </ul>
//             </a>
//         </div>
//     )
// }
//
// export default ProfileArticle;