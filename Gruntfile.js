module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				files: {
					'build/javascripts/scripts.min.js': ['components/jquery/jquery.js', 'components/jquery.touchwipe.js', 'javascripts/main.js']
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'build/stylesheets/styles.min.css': ['stylesheets/styles.css']
				}
			}
		},
		image_resize: {
			logo144: {
				options: {
					width: 144,
					overwrite: false
				},
				files: {
					'build/images/logo144.png': 'images/logo.png'
				}
			},
			logo114: {
				options: {
					width: 114,
					overwrite: false
				},
				files: {
					'build/images/logo114.png': 'images/logo.png'
				}
			},
			logo72: {
				options: {
					width: 72,
					overwrite: false
				},
				files: {
					'build/images/logo72.png': 'images/logo.png'
				}
			},
			logo57: {
				options: {
					width: 57,
					overwrite: false
				},
				files: {
					'build/images/logo57.png': 'images/logo.png'
				}
			},
			favicon: {
				options: {
					width: 32,
					overwrite: false
				},
				files: {
					'build/images/favicon.png': 'images/logo.png'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						src: 'images/logo.png',
						dest: 'build/images/logo.png'
					}
				]
			}
		},
		jade: {
			debug: {
				options: {
					pretty: true,
					data: {
						debug: true,
						manifest: ""
					}
				},
				files: {
					"index.html": "index.jade"
				}
			},
			release: {
				options: {
					data: {
						debug: false,
						manifest: "manifest.appcache"
					}
				},
				files: {
					"build/index.html": "index.jade"
				}
			}
		},
		manifest: {
			generate: {
				options: {
					basePath: "build",
					preferOnline: true
				},
				src: [
					"images/logo.png",
					"javascripts/*.js",
					"stylesheets/*.css",
					"index.html"
				],
				dest: "build/manifest.appcache"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-image-resize');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-manifest');

	grunt.registerTask('default', ['uglify', 'cssmin', 'image_resize', 'copy', 'jade', 'manifest']);
};