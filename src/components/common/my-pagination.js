import React from 'react';

class MyPagination extends React.Component {
    handleClick = (e) => {
        let pageCount = e.target.getAttribute("name")
        let {currentPageCount} = this.props
        if (parseInt(pageCount) === currentPageCount) {
            return
        }
        switch (pageCount) {
            case "pre":
                currentPageCount--
                break
            case "nex":
                currentPageCount++
                break
            default:
                currentPageCount = pageCount
        }
        this.props.fromPaginationToParent(currentPageCount)
    }

    render() {
        const {currentPageCount, dataCount, dataPerPage} = this.props
        const totalPagesCount = Math.ceil(dataCount / dataPerPage)
        let arr = []
        if (totalPagesCount <= 5) {
            for (let i = 0; i < totalPagesCount; i++) {
                arr.push(i + 1)
            }
        } else {
            let startPageCount
            let endPageCount
            startPageCount = currentPageCount - 2
            endPageCount = currentPageCount + 2
            arr = [currentPageCount - 2, currentPageCount - 1, currentPageCount, currentPageCount + 1, currentPageCount + 2]
            if (startPageCount <= 0) {
                let count = -(startPageCount)
                let lastValue = arr[arr.length - 1]
                arr.splice(0, count + 1)
                for (let i = 0; i < count + 1; i++) {
                    lastValue += 1
                    arr.push(lastValue)
                }
            }
            if (endPageCount > totalPagesCount) {
                let count = (endPageCount - totalPagesCount)
                let firstValue = arr[0]
                arr.splice(arr.length - count, count + 1)
                for (let i = 0; i < count; i++) {
                    firstValue -= 1
                    arr.unshift(firstValue)
                }
            }
        }
        return (
            <ul className="pagination" style={{margin: "0 auto"}}>
                <li className={`page-item ${currentPageCount === 1 ? "disabled" : ""}`}>
                    <p className="page-link" role="button" onClick={this.handleClick} name="pre">
                        ‹
                    </p>
                </li>
                {
                    arr.map((item, idx) => (
                        <li key={idx} className={`page-item ${currentPageCount === item ? "active" : ""}`}>
                            <p className="page-link" role="button" onClick={this.handleClick} name={item}>{item}</p>
                        </li>
                    ))
                }
                <li className={`page-item ${currentPageCount === totalPagesCount ? "disabled" : ""}`}>
                    <p className="page-link" role="button" onClick={this.handleClick} name="nex">
                        ›
                    </p>
                </li>
            </ul>
        )
    }
}

export default MyPagination;
