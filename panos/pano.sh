asciinema rec "all-images-"$(date +%Y-%m-%d)".cast" -c '

ionice pto_gen -o ./a_step1.pto \
./panos/IMG_1191-HDR_Panorama.tiles/pano_f.jpg \
./panos/IMG_1203-HDR_Panorama.tiles/pano_f.jpg \
./panos/IMG_1232_Panorama.tiles/pano_f.jpg \
./panos/IMG_1236-HDR_Panorama.tiles/pano_f.jpg \
./panos/IMG_1228_Panorama.tiles/pano_f.jpg \
./panos/IMG_1215-HDR_Panorama.tiles/pano_f.jpg \

ionice cpfind --celeste --fullscale --cache -o a_step2.pto a_step1.pto

#ionice celeste_standalone -i a_step2.pto -o a_step3.pto

#ionice cpclean -o a_step4.pto a_step3.pto

#autooptimiser -a -l -s -o a_step5.pto a_step4.pto

#pano_modify -o a_step6.pto --center --straighten --canvas=AUTO --crop=AUTO a_step5.pto

#hugin_executor --stitching --prefix=prefix a_step6.pto

exit
'
