import {useAppDispatch, useAppSelector} from "../../state/storeHooks";
import {setCurrentPage} from "../../state/ArticlesSlice";

const Pagination = () => {
    const {currentPage, articlesCount, articles} = useAppSelector(state => state.articles);
    const pagesCount = Math.ceil(articlesCount / 10);
    const dispatch = useAppDispatch();

    const changePage = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber));
    }

    if (!articles) {
        return;
    }

    return (
        <ul className="pagination">
            {Array.from({ length: pagesCount }, (_, index) => index + 1).map(item => (
                <li onClick={() => changePage(item)} key={item} className={`page-item ${currentPage === item ? 'active' : ''}`}>
                    <div className="page-link">{item}</div>
                </li>
            ))}
        </ul>
    );
}

export default Pagination;