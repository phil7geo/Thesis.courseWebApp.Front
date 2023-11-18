import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
    return (
        <div>
            <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                rel="stylesheet"
            />

            <section id="content" className="container">
                <div className="page-heading">
                    <div className="media clearfix">
                        <div className="media-left pr30">
                            <a href="#">
                                <img className="media-object mw150" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                            </a>
                        </div>
                        <div className="media-body va-m">
                            <h2 className="media-heading">Michael Halls
                                <small> - Profile</small>
                            </h2>
                            <p className="lead">Lorem ipsum dolor sit amet ctetur adicing elit, sed do eiusmod tempor incididunt</p>
                            <div className="media-links">
                                <ul className="list-inline list-unstyled">
                                    {/* ... your list items ... */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-star"></i>
                                </span>
                                <span className="panel-title"> User Popularity</span>
                            </div>
                            <div className="panel-body pn">
                                <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                                    <thead>
                                        <tr className="hidden">
                                            <th className="mw30">#</th>
                                            <th>First Name</th>
                                            <th>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ... your table body ... */}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-trophy"></i>
                                </span>
                                <span className="panel-title"> My Skills</span>
                            </div>
                            <div className="panel-body pb5">
                                {/* ... your skills labels ... */}
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-heading">
                                <span className="panel-icon">
                                    <i className="fa fa-pencil"></i>
                                </span>
                                <span className="panel-title">About Me</span>
                            </div>
                            <div className="panel-body pb5">
                                <h6>Experience</h6>
                                {/* ... your experience ... */}
                                <hr className="short br-lighter" />
                                <h6>Education</h6>
                                {/* ... your education ... */}
                                <hr className="short br-lighter" />
                                <h6>Accomplishments</h6>
                                {/* ... your accomplishments ... */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="tab-block">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab1" data-toggle="tab">Activity</a>
                                </li>
                                <li>
                                    <a href="#tab1" data-toggle="tab">Social</a>
                                </li>
                                <li>
                                    <a href="#tab1" data-toggle="tab">Media</a>
                                </li>
                            </ul>
                            <div className="tab-content p30" style={{ height: '730px' }}>
                                <div id="tab1" className="tab-pane active">
                                    <div className="media">
                                        <a className="pull-left" href="#"> <img className="media-object mn thumbnail mw50" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="..." /> </a>
                                        <div className="media-body">
                                            <h5 className="media-heading mb20">Simon Rivers Posted
                                                <small> - 3 hours ago</small>
                                            </h5>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="mw140 mr25 mb20" />
                                            <img src="https://bootdey.com/img/Content/avatar/avatar8.png" className="mw140 mr25 mb20" />
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="mw140 mb20" />
                                            <div className="media-links">
                                                {/* ... your media links ... */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ... rest of your content ... */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;