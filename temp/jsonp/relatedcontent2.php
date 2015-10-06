<?php

$callback = $_GET["callback"];
$response = $callback . '([
	{
		"seeAllUrl":"/content/rwjf/en/search-results",
		"relatedResearches":[
			{
				"imgUrl":"/images/social/open-graph-icon.jpg",
				"title":"Robert Wood Johnson Foundation Clinical Scholars Program",
				"url":"/content/rwjf/en/grants/grant-records/1972/10/robert-wood-johnson-foundation-clinical-scholars-program"
			},
			{
				"imgUrl":"/images/social/open-graph-icon.jpg",
				"title":"Evaluation of Consumer Voices for Coverage: Strengthening State Advocacy Networks to Expand Health Coverage",
				"desc":"This evaluation, led by Judith Woodridge of Mathematica Policy Research, Inc. (MPR), looks at an initiative designed and funded by the Robert Wood Johnson Foundation to establish state-based consumer health advocacy networks.",
				"url":"/content/rwjf/en/research-publications/find-rwjf-research/2009/05/evaluation-of-consumer-voices-for-coverage-strengthening-state-a"
			}
		]
	}
])';

echo $response;
?>