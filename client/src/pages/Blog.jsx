import React, { useState, useEffect } from 'react'

import { post, post as Post } from './Blog/articlePost';

import '../styles/pageStyles/blog/blog.css'

import blogServices from '../_services/blog.services'

export default function Blog() {
    const [loading, setLoading] = useState(false)
	// const [endOfTable, setEndOfTable] = useState(false)
	const [posts, setPosts] = useState([])
	const [loadCounter, setLoadCounter] = useState(0)
	const loadAmout = 11
	
    const loadMore = () => {
		setLoading(true)
		blogServices.lazyBlogposts(loadCounter * loadAmout, loadAmout)
			.then(json => {
				if (json?.exist) {
					setLoadCounter(loadCounter + 1)					
					setPosts([...posts, ...json?.data])
					setLoading(false)
				} else {
					// setEndOfTable(true)
				}
			})
	}

	useEffect(loadMore, [])

	/*
			<h1>Blog</h1>
            <ul>
                {posts?.map((post)=>(
                    <li>{post.id}</li>
                ))}
            </ul>
            <p>loading: {loading} | endOfTable: {endOfTable}</p>

	*/
	const idLatest = [70, 69, 64];

	let topPosts = posts?.filter((el) => idLatest.includes(el.id));
	let otherPosts = posts?.filter((el) => !idLatest.includes(el.id));

    return(
        <section className='blogContainer'>
			<div className='topStories' id="centeredDiv">
				<h1>Welcome to Fuel Fighter Blog</h1>
				<p>We at Fuel Fighter NTNU want to share our experience with our friends, family and anyone else interested in what we do. Our blog is the best way for anyone interested to get an in depth view of what we do both socially and as a technical student organization.</p>
				</div>
			<div className='latestPosts'>
				<h1 className='titlePosts'>Latest News</h1>
				<div className='articlesRow'>
					{topPosts?.map((el, idx)=> <Post props={el}/>)}
					<div className='suggestions'>
						<h5 style={    {'fontFamily': 'Roboto-Black', 'marginTop': '7%'}}>Our suggestions:</h5>
							<li><i class="bi bi-1-square-fill"></i><a>Design contest</a></li>
							<li><i class="bi bi-2-square-fill"></i><a>What a beatiful week</a></li>
							<li><i class="bi bi-3-square-fill"></i><a>We did it!</a></li>
							<li><i class="bi bi-4-square-fill"></i><a>Unexpected problems</a></li>
					</div>
				</div>
			</div>
			<div className='articlesCont'>
				<h1>Articles</h1>
				<div className='articles'>
					{
						otherPosts?.map((el, idx) =>
							<div key={idx}>
								<Post props={el} />
							</div>
						)
					}
				</div>
			</div>
			<button className="btn btn-primary" style={{'backgroundColor':'var(--blue)','borderColor':'var(--blue)' }}onClick={loadMore} disabled={loading}>Load more</button>
        </section>
    )
}